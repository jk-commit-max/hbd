import React, { useMemo } from "react";

export default function FloatingParticles() {
  // Generate random stable particles
  const particles = useMemo(() => {
    const items = [];
    const symbols = ["✨", "💛", "🌸", "⭐", "💫", "🧡", "✨", "🤍"];
    for (let i = 0; i < 18; i++) {
      items.push({
        id: i,
        symbol: symbols[i % symbols.length],
        left: `${(i * 19 + 7) % 94}%`,
        top: `${(i * 23 + 11) % 92}%`,
        size: `${12 + (i % 5) * 4}px`,
        duration: `${14 + (i % 6) * 3}s`,
        delay: `${(i % 5) * 1.5}s`,
        opacity: 0.25 + (i % 4) * 0.1,
      });
    }
    return items;
  }, []);

  return (
    <div className="floating-particles-container" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="floating-particle"
          style={{
            left: p.left,
            top: p.top,
            fontSize: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        >
          {p.symbol}
        </span>
      ))}
      {/* Soft warm ambient lighting blobs */}
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />
      <div className="ambient-glow ambient-glow-3" />
    </div>
  );
}
