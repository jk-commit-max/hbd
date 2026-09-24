import React from "react";
import { birthdayConfig } from "../birthdayConfig";

export default function Step1Welcome({ onStart }) {
  const { name, intro } = birthdayConfig;

  return (
    <section className="scene step-welcome" aria-labelledby="welcome-heading">
      <div className="scene-content welcome-card">
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
            onClick={onStart}
            aria-label="Enter your birthday story"
          >
            <span>{intro.buttonText}</span>
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
