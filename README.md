# 🎂 Happy Birthday Interactive Story Website

A mobile-first, premium interactive birthday website built for a sweet and beloved cousin.
Designed with an **Apple-like minimalist aesthetic**, warm cream/peach tones, rich micro-interactions, sound effects, and a 7-stage interactive personal story progression.

---

## ✨ Features & The 7-Stage Experience

1. **Step 1 — Welcome**: Warm opening greeting with subtle floating ambient particles and playful punchlines.
2. **Step 2 — Even Legends Admire Him**: Horizontally swipeable card carousel featuring real and beloved legends (PM Narendra Modi, Superstar Mahesh Babu, Director Rajamouli, and Sai Barath).
3. **Step 3 — Why He's So Sweet**: Animated "exhibits" of evidence with staggered entrance cards celebrating his personality.
4. **Step 4 — The Photo Exhibition**: An interactive 3D museum gallery with gilded picture frames, gallery spotlights, dual stage/wall view modes, live applause counters, and cinematic lightbox zoom.
5. **Step 5 — The Cousin Quiz**: 3 lighthearted multiple-choice questions with instant sound/visual feedback and an official "100% Certified Awesome Cousin ❤️" outcome.
6. **Step 6 — Make a Wish (Visual Climax)**: Multi-tiered interactive birthday cake with a flickering candle flame. Tapping the candle extinguishes the flame, releases rising smoke, triggers a warm room flash, launches dual-cannon confetti, and reveals the grand birthday headline and heartfelt message.
7. **Step 7 — One Last Thing**: An interactive 3D envelope with a wax stamp seal that opens into a heartfelt keepsake letter, accompanied by a replay button.

---

## 🎨 Design System

* **Palette**: Warm cream (`#FAF7F2`), soft peach (`#FFE5D9`), warm rose/coral (`#E76F51`), and golden highlights (`#F4A261`).
* **Typography**: Clean modern sans-serif (*Plus Jakarta Sans*) with editorial serif accents (*Instrument Serif*).
* **Audio**: 100% self-contained Web Audio API synthesizer for chimes, pop sounds, candle blow whoosh, and celebratory fanfare with a global mute toggle button.
* **Confetti**: Lightweight zero-dependency HTML5 canvas confetti engine.
* **Mobile-First**: Designed for 320–430px screens with >=44px touch targets and `viewport-fit=cover` safe-area support. Responsive and centered on desktop.

---

## 🛠️ How to Customize

All personalized content is centralized inside a single file:

```
src/birthdayConfig.js
```

You can customize:
- `name`: Cousin's name (automatically populates everywhere)
- `intro`: Welcome titles, subtitles, and button copy
- `legendsSection`: Fictional personas, badges, emojis, and quotes
- `reasonsSection`: Evidence cards, emojis, and descriptions
- `memoriesSection`: Era tags, years, captions, and images
- `quizSection`: Quiz questions, options, explanations, and result certificate
- `videosSection`: Funny video clips, titles, tags, captions, video file paths, and poster art
- `wishSection`: Birthday headline and heartfelt message paragraphs
- `surpriseSection`: Wax seal letter, personal letter body, signature

### Adding Your Own Videos & Photos

- **Videos**: Drop your video clips (e.g. `funny-clip-1.mp4`, `funny-clip-2.mp4`) into the `/public/videos/` folder and match the paths in `src/birthdayConfig.js`.
- **Photos**: Drop photos into `/public/images/` and update paths in `src/birthdayConfig.js`.
- If any video or image has not yet been added, the site gracefully renders clean, styled gradient cards with fallback preview players and emojis.

---

## 🚀 Running Locally

1. Open a terminal in the project directory:
   ```bash
   
   ```

2. Install dependencies (already installed):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) on your phone or browser.

---

## ☁️ Deploying to AWS

This project is completely static (no backend or external API keys needed):

1. **Build the production bundle**:
   ```bash
   npm run build
   ```
   This generates the optimized static files in the `dist/` folder.

2. **Deploy to AWS S3 & CloudFront**:
   - Upload the contents of `dist/` to an Amazon S3 bucket configured for static website hosting.
   - Attach an Amazon CloudFront distribution for HTTPS and fast worldwide edge delivery.
   - Or deploy directly with **AWS Amplify**: connect your repository and set build command to `npm run build` and output directory to `dist`.
