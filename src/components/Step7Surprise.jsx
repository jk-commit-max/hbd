import React, { useState } from "react";
import { birthdayConfig } from "../birthdayConfig";
import { playChime, playPop } from "../utils/audio";
import { confetti } from "../utils/confetti";

export default function Step7Surprise({ onReplay }) {
  const { name, surpriseSection } = birthdayConfig;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    playPop(true);
    setIsOpen(true);
    setTimeout(() => {
      playChime();
      confetti.burst({ count: 50, originX: 0.5, originY: 0.4 });
    }, 400);
  };

  return (
    <section className="scene step-surprise" aria-labelledby="surprise-heading">
      <div className="scene-content">
        {/* Header */}
        <div className="section-header">
          <div className="pill-badge">
            <span>Special Delivery 🎁</span>
          </div>
          <h2 id="surprise-heading" className="section-title">
            {surpriseSection.heading}
          </h2>
          <p className="section-subtitle">
            {surpriseSection.subheading}
          </p>
        </div>

        {/* Envelope Interaction Container */}
        <div className="envelope-interactive-container">
          {!isOpen ? (
            /* Closed Envelope with Wax Seal */
            <div className="envelope-closed-card" onClick={handleOpenEnvelope}>
              <div className="envelope-outer">
                <div className="envelope-top-flap" />
                <div className="envelope-pocket">
                  <div className="wax-seal-btn" role="button" aria-label="Open sealed letter">
                    <span className="seal-emoji">{surpriseSection.envelopeSeal}</span>
                    <span className="seal-ring" />
                  </div>
                  <div className="envelope-to-label">
                    <span>For: {name}</span>
                  </div>
                </div>
              </div>

              <div className="envelope-prompt-wrap">
                <button
                  type="button"
                  className="action-button-large glow-effect"
                  onClick={handleOpenEnvelope}
                >
                  <span>{surpriseSection.buttonPrompt}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Open Letter Display */
            <div className="letter-expanded-card animate-letter-reveal">
              <div className="letter-stationery">
                <div className="letter-decorative-header">
                  <span className="letter-seal-mini">💌</span>
                  <span className="letter-date">A Keepsake For You</span>
                </div>

                <h3 className="letter-heading">{surpriseSection.letterTitle}</h3>

                {/* Keepsake Photo of Cousin */}
                {surpriseSection.photo && (
                  <div className="letter-keepsake-photo-frame">
                    <div className="keepsake-polaroid-inner">
                      <img
                        src={surpriseSection.photo}
                        alt={name}
                        className="keepsake-photo-img"
                      />
                      <div className="keepsake-caption-tape">
                        <span className="keepsake-sweet-quote">
                          “{surpriseSection.photoCaption || "Such a sweet person ❤️"}”
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="letter-body-content">
                  {surpriseSection.letterBody.map((paragraph, index) => (
                    <p key={index} className="letter-text">
                      {paragraph.replace("[COUSIN_NAME]", name)}
                    </p>
                  ))}
                </div>

                <div className="letter-signature-block">
                  <p className="letter-signoff">Always,</p>
                  <p className="letter-sender-name">
                    {surpriseSection.signature}
                  </p>
                </div>
              </div>

              {/* Final Footer & Replay */}
              <div className="surprise-footer-actions">
                <button
                  type="button"
                  className="replay-story-btn"
                  onClick={onReplay}
                  aria-label="Replay the birthday story from the beginning"
                >
                  <span>{surpriseSection.replayButtonText}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
