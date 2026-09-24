import React, { useState } from "react";
import { birthdayConfig } from "../birthdayConfig";
import { playCandleBlow, playCelebrationFanfare } from "../utils/audio";
import { confetti } from "../utils/confetti";

export default function Step6Wish({ onNext }) {
  const { name, wishSection } = birthdayConfig;
  const [isBlownOut, setIsBlownOut] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  const handleBlowCandle = () => {
    if (isBlownOut || isBlowing) return;

    setIsBlowing(true);
    playCandleBlow();

    // 1. Flame flickers for a fraction of a second
    setTimeout(() => {
      // 2. Extinguish flame
      setIsBlownOut(true);
      setIsBlowing(false);
      setShowFlash(true);

      // 3. Audio celebration fanfare
      playCelebrationFanfare();

      // 4. Confetti burst from dual cannons
      confetti.burstDual();

      // Reset ambient flash after brief warm burst
      setTimeout(() => setShowFlash(false), 900);
    }, 380);
  };

  return (
    <section
      className={`scene step-wish ${showFlash ? "celebration-flash-active" : ""}`}
      aria-labelledby="wish-heading"
    >
      <div className="scene-content">
        {/* Header */}
        <div className="section-header">
          <div className="pill-badge">
            <span>Special Moment ✨</span>
          </div>
          <h2 id="wish-heading" className="section-title">
            {wishSection.heading}
          </h2>
          <p className="section-subtitle">
            {wishSection.subheading.replace("[COUSIN_NAME]", name)}
          </p>
        </div>

        {/* Animated Cake & Candle Stage */}
        <div className="cake-stage-container">
          <div
            className={`cake-interactive-wrap ${isBlownOut ? "candle-extinguished" : "candle-lit"}`}
            onClick={handleBlowCandle}
            role="button"
            tabIndex={0}
            aria-label={isBlownOut ? "Candle extinguished" : "Tap candle to blow it out"}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleBlowCandle();
              }
            }}
          >
            {/* Ambient flame halo glow */}
            {!isBlownOut && (
              <div
                className={`candle-ambient-glow ${isBlowing ? "flicker-heavy" : "flicker-gentle"}`}
                aria-hidden="true"
              />
            )}

            {/* SVG Cake Art */}
            <div className="cake-svg-wrapper">
              <svg
                viewBox="0 0 320 280"
                className="cake-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Gradients */}
                  <linearGradient id="cakePlateGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E2DCD5"/>
                    <stop offset="50%" stopColor="#FFFFFF"/>
                    <stop offset="100%" stopColor="#D3CBC2"/>
                  </linearGradient>

                  <linearGradient id="tierBottomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFE5D9"/>
                    <stop offset="100%" stopColor="#FFCAD4"/>
                  </linearGradient>

                  <linearGradient id="tierTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFF1E6"/>
                    <stop offset="100%" stopColor="#FFE5D9"/>
                  </linearGradient>

                  <linearGradient id="frostingDripGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF"/>
                    <stop offset="100%" stopColor="#FFF5F0"/>
                  </linearGradient>

                  <linearGradient id="candleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF9EAA"/>
                    <stop offset="35%" stopColor="#FFFFFF"/>
                    <stop offset="70%" stopColor="#FF9EAA"/>
                    <stop offset="100%" stopColor="#E76F51"/>
                  </linearGradient>

                  <radialGradient id="flameInnerGrad" cx="50%" cy="60%" r="50%">
                    <stop offset="0%" stopColor="#FFFFFF"/>
                    <stop offset="40%" stopColor="#FFE169"/>
                    <stop offset="80%" stopColor="#FF9E00"/>
                    <stop offset="100%" stopColor="#FF5400"/>
                  </radialGradient>
                </defs>

                {/* Cake Stand / Plate */}
                <ellipse cx="160" cy="250" rx="140" ry="20" fill="rgba(0,0,0,0.06)" />
                <ellipse cx="160" cy="245" rx="135" ry="16" fill="url(#cakePlateGrad)" stroke="#E5DDD5" strokeWidth="1.5" />
                <path d="M 130 252 L 120 268 L 200 268 L 190 252 Z" fill="#E8E2DC" />
                <ellipse cx="160" cy="268" rx="45" ry="6" fill="#D8D0C7" />

                {/* Bottom Tier */}
                <rect x="55" y="165" width="210" height="70" rx="14" fill="url(#tierBottomGrad)" />
                {/* Bottom Tier Frosting Trim */}
                <path
                  d="M 55 180 Q 75 195 95 180 Q 115 195 135 180 Q 155 195 175 180 Q 195 195 215 180 Q 235 195 255 180 Q 265 185 265 180"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                {/* Top Tier */}
                <rect x="85" y="105" width="150" height="65" rx="12" fill="url(#tierTopGrad)" />
                {/* Dripping Glaze on Top Tier */}
                <path
                  d="M 85 110 
                     C 95 125, 105 135, 110 120
                     C 118 138, 125 142, 132 118
                     C 140 148, 148 145, 155 120
                     C 165 140, 172 135, 180 115
                     C 190 142, 198 138, 205 118
                     C 215 132, 225 125, 235 110
                     L 235 105 L 85 105 Z"
                  fill="url(#frostingDripGrad)"
                />

                {/* Colorful cute sprinkles */}
                <circle cx="105" cy="140" r="3" fill="#FF85A1" />
                <circle cx="130" cy="148" r="2.5" fill="#FFD166" />
                <circle cx="160" cy="142" r="3" fill="#06D6A0" />
                <circle cx="190" cy="146" r="2.5" fill="#118AB2" />
                <circle cx="215" cy="138" r="3" fill="#9D4EDD" />

                <circle cx="80" cy="205" r="3" fill="#FFD166" />
                <circle cx="120" cy="215" r="3.5" fill="#FF85A1" />
                <circle cx="160" cy="208" r="3" fill="#06D6A0" />
                <circle cx="200" cy="218" r="3.5" fill="#118AB2" />
                <circle cx="240" cy="206" r="3" fill="#F4A261" />

                {/* Candle */}
                <rect x="154" y="55" width="12" height="50" rx="4" fill="url(#candleGrad)" />
                {/* Candle stripes */}
                <line x1="154" y1="65" x2="166" y2="72" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="154" y1="80" x2="166" y2="87" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="154" y1="95" x2="166" y2="102" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

                {/* Wick */}
                <line x1="160" y1="55" x2="160" y2="45" stroke="#3D2E2B" strokeWidth="2" strokeLinecap="round" />

                {/* Flame (visible when lit) */}
                {!isBlownOut && (
                  <g className={`cake-flame-group ${isBlowing ? "flame-flickering" : "flame-dancing"}`}>
                    <path
                      d="M 160 14 C 150 28, 148 40, 160 46 C 172 40, 170 28, 160 14 Z"
                      fill="url(#flameInnerGrad)"
                    />
                    <ellipse cx="160" cy="40" rx="4" ry="6" fill="#FFFFFF" opacity="0.9" />
                  </g>
                )}

                {/* Smoke curling puff (visible after blown out) */}
                {isBlownOut && (
                  <g className="smoke-puff-group" aria-hidden="true">
                    <path
                      d="M 160 44 Q 155 35 163 26 Q 168 18 160 8"
                      fill="none"
                      stroke="rgba(160, 150, 145, 0.75)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="smoke-trail-1"
                    />
                    <path
                      d="M 160 44 Q 166 32 158 22 Q 154 12 165 4"
                      fill="none"
                      stroke="rgba(200, 190, 185, 0.5)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="smoke-trail-2"
                    />
                  </g>
                )}
              </svg>
            </div>

            {/* Instruction prompt below the cake */}
            <div className="candle-tap-prompt">
              {!isBlownOut ? (
                <p className="candle-instruction pulse-subtle">
                  {wishSection.candleInstruction}
                </p>
              ) : (
                <p className="candle-wish-made animate-fade-in">
                  ✨ Your wish is officially locked in! ✨
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Revealed Heartfelt Birthday Message */}
        {isBlownOut && (
          <div className="revealed-birthday-container animate-fade-up">
            <div className="birthday-headline-block">
              <span className="celebration-badge">🎂 CELEBRATION TIME 🎂</span>
              <h1 className="birthday-grand-title">
                {wishSection.birthdayHeadline} {name.toUpperCase()}!
              </h1>
            </div>

            <div className="heartfelt-card">
              {wishSection.birthdayMessage.map((para, idx) => (
                <p key={idx} className="heartfelt-paragraph">
                  {para.replace("[COUSIN_NAME]", name)}
                </p>
              ))}
            </div>

            <div className="wish-action-wrap">
              <button
                type="button"
                className="action-button-large glow-effect"
                onClick={onNext}
              >
                <span>{wishSection.buttonText}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
