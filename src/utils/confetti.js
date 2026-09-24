// Ultra-lightweight canvas confetti engine
// Zero dependencies, maximum performance 60fps on mobile

class ConfettiEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationId = null;
    this.colors = [
      "#FF6B6B",
      "#FFD166",
      "#FFCAD4",
      "#F4A261",
      "#E76F51",
      "#4EA8DE",
      "#FFB5A7",
      "#F72585",
      "#FFBE0B",
    ];
  }

  initCanvas() {
    if (this.canvas) return;
    this.canvas = document.createElement("canvas");
    this.canvas.id = "birthday-confetti-canvas";
    this.canvas.style.position = "fixed";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.width = "100vw";
    this.canvas.style.height = "100vh";
    this.canvas.style.pointerEvents = "none";
    this.canvas.style.zIndex = "9999";
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.handleResize = () => {
      if (this.canvas) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      }
    };
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  burst({ count = 100, originX = 0.5, originY = 0.5, spread = 60, velocity = 15 } = {}) {
    this.initCanvas();
    const width = window.innerWidth;
    const height = window.innerHeight;
    const startX = width * originX;
    const startY = height * originY;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI / 180) * (spread * (Math.random() - 0.5) - 90);
      const speed = velocity * (0.6 + Math.random() * 0.8);
      this.particles.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 4,
        vy: Math.sin(angle) * speed - 2,
        size: Math.random() * 7 + 4,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        wobble: Math.random() * Math.PI,
        wobbleSpeed: 0.08 + Math.random() * 0.05,
        opacity: 1,
        shape: Math.random() > 0.4 ? "rect" : "circle",
      });
    }

    if (!this.animationId) {
      this.animate();
    }
  }

  // Dual cannons for the cake climax: shoots from bottom-left and bottom-right
  burstDual() {
    this.burst({ count: 70, originX: 0.15, originY: 0.85, spread: 70, velocity: 22 });
    this.burst({ count: 70, originX: 0.85, originY: 0.85, spread: 70, velocity: 22 });
    setTimeout(() => {
      this.burst({ count: 40, originX: 0.5, originY: 0.6, spread: 90, velocity: 16 });
    }, 250);
  }

  animate() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.45; // Gravity
      p.vx *= 0.985; // Drag
      p.rotation += p.rotationSpeed;
      p.wobble += p.wobbleSpeed;
      p.opacity -= 0.007;

      if (p.opacity <= 0 || p.y > this.canvas.height + 20) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.scale(Math.cos(p.wobble), 1);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;

      if (p.shape === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      }
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.animationId = null;
      if (this.ctx && this.canvas) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }
}

export const confetti = new ConfettiEngine();
