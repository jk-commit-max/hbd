import React, { useState, useRef } from "react";
import { birthdayConfig } from "../birthdayConfig";
import { playMotorcycleRev } from "../utils/audio";

export default function Step1Welcome({ onStart }) {
  const { name, intro } = birthdayConfig;
  const bikerWrapRef = useRef(null);
  const [isRiding, setIsRiding] = useState(false);

  const handleStartRide = () => {
    if (isRiding) return;
    setIsRiding(true);
    playMotorcycleRev();

    const bikerEl = bikerWrapRef.current;
    // Find the starting line on the asphalt track at the top
    const trackStartEl =
      document.querySelector(".start-line-gate") ||
      document.querySelector(".race-track-asphalt");

    if (bikerEl && trackStartEl) {
      const bikerRect = bikerEl.getBoundingClientRect();
      const trackRect = trackStartEl.getBoundingClientRect();

      // Compute exact pixel delta from center of hero biker to the starting line on the track
      const targetCenterX = trackRect.left + 22;
      const targetCenterY = trackRect.top + trackRect.height / 2;
      const currentCenterX = bikerRect.left + bikerRect.width / 2;
      const currentCenterY = bikerRect.top + bikerRect.height / 2;

      const deltaX = targetCenterX - currentCenterX;
      const deltaY = targetCenterY - currentCenterY;

      // Track rider image is 38px, hero image is ~85px high
      const targetScale = Math.min(0.48, Math.max(0.36, 38 / (bikerRect.height || 85)));

      // Apply single butter-smooth GPU hardware-accelerated glide
      bikerEl.style.transition =
        "transform 0.55s cubic-bezier(0.25, 0.9, 0.3, 1), opacity 0.14s ease 0.44s";
      bikerEl.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${targetScale})`;
      bikerEl.style.opacity = "0";
    }

    // Step 2 seamlessly takes over right as the biker docks at the starting line
    setTimeout(() => {
      onStart();
    }, 560);
  };

  return (
    <section className="scene step-welcome" aria-labelledby="welcome-heading">
      <div className="scene-content welcome-card">
        {/* ================================================================
            BIG HERO BIKER (ABOVE SPECIAL DELIVERY BADGE)
            ================================================================ */}
        <div
          ref={bikerWrapRef}
          className={`welcome-hero-biker-wrap ${isRiding ? "is-riding-to-track" : ""}`}
          onClick={handleStartRide}
          title="Click to rev the bike!"
        >
          {/* Speech Bubble */}
          <div className="hero-biker-speech-bubble" aria-hidden="true">
            <span>Ready to ride? 😎</span>
          </div>

          {/* Ambient Warm Golden Glow */}
          <div className="hero-biker-glow-orb" aria-hidden="true" />

          {/* Motorcycle & Rider Image */}
          <div className="hero-biker-frame">
            <img
              src="/images/rider-bullet.png"
              alt="Sai Bharath on Royal Enfield"
              className="hero-biker-img"
            />
            {/* Trailing exhaust smoke puff */}
            <span className="hero-biker-smoke" aria-hidden="true">
              💨
            </span>
          </div>

          {/* Soft Ground Contact Shadow */}
          <div className="hero-biker-shadow" aria-hidden="true" />
        </div>

        {/* Playful badge */}
        <div className="pill-badge animate-badge">
          <span>{intro.badge}</span>
        </div>

        {/* Large elegant greeting */}
        <h1 id="welcome-heading" className="welcome-greeting">
          <span className="greeting-prefix">{intro.greeting} </span>
          <span className="greeting-name">{name}</span>
          <span className="greeting-dots">…</span>
        </h1>

        {/* Core statement */}
        <p className="welcome-headline">
          {intro.title.replace("[COUSIN_NAME]", name)}
        </p>

        {/* Playful punchline */}
        <div className="welcome-punchline-card">
          <p className="welcome-punchline">
            {intro.subtitle.replace("[COUSIN_NAME]", name)}
          </p>
        </div>

        {/* Main CTA Button */}
        <div className="welcome-action-wrap">
          <button
            type="button"
            className="action-button-large glow-effect"
            onClick={handleStartRide}
            aria-label="Start the journey"
          >
            <span>{isRiding ? "Riding to track… 🏍️💨" : intro.buttonText}</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </button>

          {intro.hint && (
            <p className="welcome-hint">{intro.hint}</p>
          )}
        </div>
      </div>
    </section>
  );
}
