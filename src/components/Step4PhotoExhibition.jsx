import React, { useState } from "react";
import { birthdayConfig } from "../birthdayConfig";
import ImageWithFallback from "./ImageWithFallback";
import { playPop, playChime } from "../utils/audio";
import { confetti } from "../utils/confetti";

export default function Step4PhotoExhibition() {
  const { name, exhibitionSection } = birthdayConfig;
  const artworks = exhibitionSection.artworks;

  const [activeIndex, setActiveIndex] = useState(0);
  const [likes, setLikes] = useState({});
  const [lightboxArtwork, setLightboxArtwork] = useState(null);
  const [viewMode, setViewMode] = useState("carousel"); // "carousel" or "grid"
  const [spotlightOn, setSpotlightOn] = useState(true);

  const currentArt = artworks[activeIndex];

  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    playPop(true);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % artworks.length);
    playChime();
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
    playChime();
  };

  const openLightbox = (art) => {
    setLightboxArtwork(art);
    playChime();
    confetti.burst({ count: 25, originX: 0.5, originY: 0.4 });
  };

  const closeLightbox = () => {
    setLightboxArtwork(null);
  };

  return (
    <section className="scene step-exhibition" aria-labelledby="exhibition-heading">
      <div className="scene-content">
        {/* Section Header */}
        <div className="section-header">
          <div className="pill-badge">
            <span>{exhibitionSection.badge}</span>
          </div>
          <h2 id="exhibition-heading" className="section-title">
            {exhibitionSection.heading}
          </h2>
          <p className="section-subtitle">
            {exhibitionSection.subheading.replace("[COUSIN_NAME]", name)}
          </p>

          {/* Controls Bar: Spotlight toggle & View Mode */}
          <div className="exhibition-toolbar">
            <button
              type="button"
              className={`toolbar-toggle-btn ${spotlightOn ? "active" : ""}`}
              onClick={() => setSpotlightOn(!spotlightOn)}
              aria-label="Toggle gallery spotlight"
            >
              <span>{spotlightOn ? "💡 Spotlight On" : "🌑 Ambient Light"}</span>
            </button>

            <div className="view-mode-pills">
              <button
                type="button"
                className={`view-pill ${viewMode === "carousel" ? "active" : ""}`}
                onClick={() => setViewMode("carousel")}
              >
                3D Stage
              </button>
              <button
                type="button"
                className={`view-pill ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                Gallery Wall
              </button>
            </div>
          </div>
        </div>

        {/* 3D EXHIBITION CAROUSEL VIEW */}
        {viewMode === "carousel" ? (
          <div className={`exhibition-3d-stage ${spotlightOn ? "spotlight-active" : ""}`}>
            {/* Museum Overhead Spotlight Beam */}
            {spotlightOn && <div className="museum-spotlight-beam" aria-hidden="true" />}

            {/* Main Centerpiece Frame */}
            <div
              className="museum-canvas-frame animate-scale-in"
              key={currentArt.id}
              onClick={() => openLightbox(currentArt)}
              role="button"
              tabIndex={0}
              aria-label={`View artwork: ${currentArt.title}`}
            >
              {/* Outer Gilded Museum Molding */}
              <div className="gilded-border-outer">
                <div className="museum-matting">
                  <div className="artwork-image-container">
                    <ImageWithFallback
                      src={currentArt.image}
                      alt={currentArt.title}
                      fallbackEmoji="🖼️"
                      fallbackText={currentArt.number}
                      objectPosition={currentArt.objectPosition || "center 15%"}
                      className="artwork-img"
                    />
                    <div className="artwork-zoom-hint">
                      <span>🔍 Tap to Inspect Masterpiece</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Museum Brass Plaque */}
              <div className="museum-brass-plaque">
                <div className="plaque-header-row">
                  <span className="plaque-number">{currentArt.number}</span>
                  <span className="plaque-year">{currentArt.year}</span>
                </div>
                <h3 className="plaque-title">{currentArt.title}</h3>
                <p className="plaque-medium">{currentArt.medium}</p>
                <p className="plaque-caption">“{currentArt.caption}”</p>
                <p className="plaque-critique">{currentArt.critique}</p>

                <div className="plaque-action-row">
                  <button
                    type="button"
                    className="art-like-btn"
                    onClick={(e) => handleLike(currentArt.id, e)}
                    aria-label="Applaud this artwork"
                  >
                    <span>💖 Masterpiece</span>
                    <span className="like-badge">
                      {(currentArt.likes || 0) + (likes[currentArt.id] || 0)}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Arrows & Pagination */}
            <div className="exhibition-nav-bar">
              <button
                type="button"
                className="exhibition-arrow-btn"
                onClick={handlePrev}
                aria-label="Previous artwork"
              >
                ‹ Previous Piece
              </button>

              <div className="exhibition-counter-pill">
                <span>{activeIndex + 1} / {artworks.length}</span>
              </div>

              <button
                type="button"
                className="exhibition-arrow-btn"
                onClick={handleNext}
                aria-label="Next artwork"
              >
                Next Piece ›
              </button>
            </div>
          </div>
        ) : (
          /* GALLERY WALL GRID VIEW */
          <div className="gallery-wall-grid">
            {artworks.map((art, idx) => (
              <article
                key={art.id}
                className="wall-frame-item animate-fade-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
                onClick={() => openLightbox(art)}
              >
                <div className="wall-frame-border">
                  <ImageWithFallback
                    src={art.image}
                    alt={art.title}
                    fallbackEmoji="🖼️"
                    fallbackText={art.number}
                    objectPosition={art.objectPosition || "center 15%"}
                    className="wall-img"
                  />
                </div>
                <div className="wall-frame-caption">
                  <span className="wall-art-num">{art.number}</span>
                  <h4 className="wall-art-title">{art.title}</h4>
                  <button
                    type="button"
                    className="wall-heart-btn"
                    onClick={(e) => handleLike(art.id, e)}
                  >
                    ❤️ {(art.likes || 0) + (likes[art.id] || 0)}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* FULLSCREEN LIGHTBOX MODAL */}
        {lightboxArtwork && (
          <div
            className="exhibition-lightbox-backdrop animate-fade-in"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="lightbox-dialog-card animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={closeLightbox}
                aria-label="Close exhibition modal"
              >
                ✕
              </button>

              <div className="lightbox-frame">
                <ImageWithFallback
                  src={lightboxArtwork.image}
                  alt={lightboxArtwork.title}
                  objectPosition={lightboxArtwork.objectPosition || "center 15%"}
                  className="lightbox-img"
                />
              </div>

              <div className="lightbox-plaque">
                <span className="lightbox-badge">{lightboxArtwork.number}</span>
                <h3 className="lightbox-title">{lightboxArtwork.title}</h3>
                <p className="lightbox-caption">“{lightboxArtwork.caption}”</p>
                <div className="lightbox-critique-box">
                  <p>{lightboxArtwork.critique}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
