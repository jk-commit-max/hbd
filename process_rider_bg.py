import os
from PIL import Image, ImageFilter
from collections import deque

def remove_black_background(input_path, output_path):
    img = Image.open(input_path).convert('RGBA')
    width, height = img.size
    pixels = img.load()
    
    # 1. Identify all pixels connected to outer boundaries that are black/near-black
    bg_mask = Image.new('L', (width, height), 255) # 255 = keep (foreground), 0 = transparent (background)
    mask_pixels = bg_mask.load()
    
    visited = bytearray(width * height)
    queue = deque()
    
    # Check all border pixels
    for x in range(width):
        for y in (0, height - 1):
            idx = y * width + x
            if not visited[idx]:
                visited[idx] = 1
                if max(pixels[x, y][:3]) <= 18:
                    mask_pixels[x, y] = 0
                    queue.append((x, y))
                    
    for y in range(height):
        for x in (0, width - 1):
            idx = y * width + x
            if not visited[idx]:
                visited[idx] = 1
                if max(pixels[x, y][:3]) <= 18:
                    mask_pixels[x, y] = 0
                    queue.append((x, y))
                    
    neighbors = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    
    while queue:
        cx, cy = queue.popleft()
        for dx, dy in neighbors:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < width and 0 <= ny < height:
                n_idx = ny * width + nx
                if not visited[n_idx]:
                    visited[n_idx] = 1
                    r, g, b, _ = pixels[nx, ny]
                    brightness = max(r, g, b)
                    # If it's connected to outer dark space and is dark (threshold 16)
                    if brightness <= 16:
                        mask_pixels[nx, ny] = 0
                        queue.append((nx, ny))

    # Also handle the upper-right speed lines background where faint black is connected
    # Now smooth the alpha mask slightly to remove stair-stepping / jagged pixels
    smooth_mask = bg_mask.filter(ImageFilter.GaussianBlur(radius=1.2))
    s_pixels = smooth_mask.load()
    
    # Build final RGBA image
    out_img = Image.new('RGBA', (width, height))
    out_pix = out_img.load()
    
    for y in range(height):
        for x in range(width):
            r, g, b, _ = pixels[x, y]
            alpha = s_pixels[x, y]
            brightness = max(r, g, b)
            
            # If the pixel was near background, ensure it fades cleanly
            if alpha == 0:
                out_pix[x, y] = (0, 0, 0, 0)
            elif alpha < 255:
                # Anti-aliased boundary pixel: prevent black halo
                ratio = alpha / 255.0
                boost = 1.0 / max(0.2, ratio)
                nr = min(255, int(r * boost))
                ng = min(255, int(g * boost))
                nb = min(255, int(b * boost))
                out_pix[x, y] = (nr, ng, nb, alpha)
            else:
                out_pix[x, y] = (r, g, b, 255)
                
    out_img.save(output_path, 'PNG', optimize=True)
    print(f"Successfully created transparent rider image: {output_path}")

if __name__ == '__main__':
    remove_black_background('public/images/rider-bullet.png', 'public/images/rider-bullet.png')
