import React, { useState } from "react";
import { birthdayConfig } from "../birthdayConfig";
import ImageWithFallback from "./ImageWithFallback";

export default function Step4Memories() {
  const { name, memoriesSection } = birthdayConfig;
  const [selectedMemory, setSelectedMemory] = useState(null);

  return (
    <section className="scene step-memories" aria-labelledby="memories-heading">
      <div className="scene-content">
        {/* Header */}
        <div className="section-header">
          <div className="pill-badge">
            <span>Golden Scrapbook 🎞️</span>
          </div>
          <h2 id="memories-heading" className="section-title">
            {memoriesSection.heading}
          </h2>
          <p className="section-subtitle">
            {memoriesSection.subheading.replace("[COUSIN_NAME]", name)}
          </p>
        </div>

        {/* Timeline Album */}
        <div className="memories-timeline">
          <div className="timeline-spine-line" aria-hidden="true" />

          {memoriesSection.memories.map((mem, index) => {
            const isSelected = selectedMemory === mem.id;
            return (
              <article
                key={mem.id || index}
                className={`memory-card-wrap ${isSelected ? "is-focused" : ""}`}
                onClick={() => setSelectedMemory(isSelected ? null : mem.id)}
              >
                {/* Timeline Node marker */}
                <div className="timeline-node" aria-hidden="true">
                  <span className="timeline-dot" />
                </div>

                {/* Polaroid Album Card */}
                <div className="memory-polaroid-card">
                  <div className="polaroid-header">
                    <span className="memory-era-badge">{mem.era}</span>
                    {mem.year && <span className="memory-year">{mem.year}</span>}
                  </div>

                  <div className="polaroid-frame">
                    <ImageWithFallback
                      src={mem.image}
                      alt={mem.title}
                      fallbackEmoji="📷"
                      fallbackText={mem.era}
                      fallbackGradient={`linear-gradient(135deg, ${mem.color || "#FFE5D9"} 0%, #FFFFFF 100%)`}
                      className="polaroid-img"
                    />
                  </div>

                  <div className="polaroid-caption-block">
                    {mem.title && <h3 className="memory-title">{mem.title}</h3>}
                    <p className="memory-caption">
                      “{mem.caption.replace("[COUSIN_NAME]", name)}”
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {memoriesSection.note && (
          <p className="memories-footer-tip">{memoriesSection.note}</p>
        )}
      </div>
    </section>
  );
}
