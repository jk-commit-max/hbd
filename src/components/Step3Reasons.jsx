import React from "react";
import { birthdayConfig } from "../birthdayConfig";

export default function Step3Reasons() {
  const { name, reasonsSection } = birthdayConfig;

  return (
    <section className="scene step-reasons" aria-labelledby="reasons-heading">
      <div className="scene-content">
        {/* Header */}
        <div className="section-header">
          <div className="pill-badge">
            <span>The Evidence 🔍</span>
          </div>
          <h2 id="reasons-heading" className="section-title">
            {reasonsSection.heading}
          </h2>
          <p className="section-subtitle">
            {reasonsSection.subheading.replace("[COUSIN_NAME]", name)}
          </p>
        </div>

        {/* Reasons Grid / Staggered Cards */}
        <div className="reasons-list">
          {reasonsSection.reasons.map((item, index) => (
            <div
              key={item.id || index}
              className="reason-card"
              style={{
                animationDelay: `${0.12 * index + 0.1}s`,
              }}
            >
              <div className="reason-emoji-bubble" aria-hidden="true">
                <span>{item.emoji}</span>
              </div>
              <div className="reason-content">
                <div className="reason-tag-row">
                  <span className="reason-tag">{item.tag || `Exhibit ${index + 1}`}</span>
                  {item.title && <h3 className="reason-item-title">{item.title}</h3>}
                </div>
                <p className="reason-text">
                  {item.text.replace("[COUSIN_NAME]", name)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
