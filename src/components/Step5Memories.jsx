import React, { useState, useEffect, useRef, useCallback } from "react";
import { birthdayConfig } from "../birthdayConfig";
import ImageWithFallback from "./ImageWithFallback";
import { playCameraClick, playHeartPop, playChime } from "../utils/audio";
import { confetti } from "../utils/confetti";

export default function Step5Memories({ onNext }) {
  const { name, memoriesSection } = birthdayConfig;
  const memories = memoriesSection.memories || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // Auto-animation enabled by default!
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [loveCounts, setLoveCounts] = useState({});
  const [floatingReactions, setFloatingReactions] = useState([]);
  const [slideDirection, setSlideDirection] = useState("next");

  const currentMem = memories[currentIndex] || {};
  const timerRef = useRef(null);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);
  const reactionIdRef = useRef(0);

  // Auto-play slideshow timer (advances every 4.8s)
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      handleNext(true);
    }, 4800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex, memories.length]);

  const goToMemory = useCallback((index, dir = "next") => {
    if (index === currentIndex) return;
    setSlideDirection(dir);
    setCurrentIndex(index);
    playCameraClick();
  }, [currentIndex]);

  const handleNext = useCallback((isAuto = false) => {
    setSlideDirection("next");
    playCameraClick();
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  }, [memories.length]);

  const handlePrev = useCallback(() => {
    setSlideDirection("prev");
    playCameraClick();
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  }, [memories.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLightboxOpen) {
        if (e.key === "Escape") setIsLightboxOpen(false);
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
        return;
      }
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === " ") {
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isLightboxOpen]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const diff = touchStartRef.current - touchEndRef.current;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartRef.current = 0;
    touchEndRef.current = 0;
  };

  // Heart / Love reaction explosion
  const handleTriggerLove = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const memId = currentMem.id;
    setLoveCounts((prev) => ({
      ...prev,
      [memId]: (prev[memId] || 0) + 1,
    }));
    playHeartPop();

    // Spawn floating particles
    const icons = ["💖", "✨", "👑", "❤️", "🥰", "🌟"];
    const newParticles = Array.from({ length: 5 }).map((_, i) => ({
      id: `${reactionIdRef.current++}-${i}`,
      icon: icons[Math.floor(Math.random() * icons.length)],
      x: 35 + Math.random() * 30,
      offsetY: -(25 + Math.random() * 85),
      rotate: (Math.random() - 0.5) * 40,
    }));

    setFloatingReactions((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setFloatingReactions((prev) =>
        prev.filter((p) => !newParticles.some((np) => np.id === p.id))
      );
    }, 1800);

    if (((loveCounts[memId] || 0) + 1) % 3 === 0) {
      confetti.burst({ count: 25, originX: 0.5, originY: 0.5 });
    }
  };

  const currentLove = loveCounts[currentMem.id] || 0;

  return (
    <section className="scene step-memories-showcase" aria-labelledby="memories-showcase-heading">
      <div className="scene-content">
        {/* Header */}
        <div className="section-header">
          <div className="pill-badge">
            <span>{memoriesSection.badge || "Memories 🎞️"}</span>
          </div>
          <h2 id="memories-showcase-heading" className="section-title">
            {memoriesSection.heading}
          </h2>
          {memoriesSection.subheading && (
            <p className="section-subtitle">
              {memoriesSection.subheading.replace("[COUSIN_NAME]", name)}
            </p>
          )}
        </div>

        {/* Stories Progress Bar (Auto Animation Segments) */}
        <div className="stories-progress-tracker" role="tablist" aria-label="Story Memories">
          {memories.map((mem, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={mem.id || idx}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                aria-label={`Jump to memory ${idx + 1}: ${mem.title}`}
                className={`story-bar-segment ${isCurrent ? "is-active" : ""} ${
                  isCompleted ? "is-completed" : ""
                }`}
                onClick={() => goToMemory(idx, idx > currentIndex ? "next" : "prev")}
              >
                <div
                  className="story-bar-fill"
                  key={`${idx}-${isCurrent ? currentIndex : "idle"}`}
                  style={{
                    animationDuration: isPlaying && isCurrent ? "4.8s" : "0s",
                    animationPlayState: isPlaying && isCurrent ? "running" : "paused",
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Top Controls Toolbar */}
        <div className="memories-toolbar">
          <div className="memory-step-indicator">
            <span className="mem-step-pill">
              Photo {currentIndex + 1} of {memories.length}
            </span>
          </div>

          <div className="memories-tool-actions">
            {/* Auto-Animation Play / Pause */}
            <button
              type="button"
              className={`tool-action-btn ${isPlaying ? "is-playing" : ""}`}
              onClick={() => setIsPlaying((p) => !p)}
              title={isPlaying ? "Pause auto animation" : "Play auto animation"}
              aria-label={isPlaying ? "Pause auto animation" : "Play auto animation"}
            >
              <span>{isPlaying ? "⏸️ Pause" : "▶️ Auto Play"}</span>
            </button>

            {/* Love / Heart Reaction Button in Toolbar */}
            <button
              type="button"
              className="tool-action-btn tool-love-btn"
              onClick={handleTriggerLove}
              title="Send love"
              aria-label="Send love reaction"
            >
              <span>{currentMem.reactionEmoji || "💖"} Love {currentLove > 0 ? `+${currentLove}` : ""}</span>
            </button>

            {/* Zoom / Lightbox */}
            <button
              type="button"
              className="tool-action-btn tool-icon-only"
              onClick={() => {
                setIsLightboxOpen(true);
                playChime();
              }}
              title="View full-size photo"
              aria-label="View photo in full screen"
            >
              <span>🔍</span>
            </button>
          </div>
        </div>

        {/* ================================================================
            AUTO-ANIMATED PHOTO STAGE (ONE BY ONE DISPLAY)
            ================================================================ */}
        <div
          className="memory-stage-viewport"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Dynamic ambient background glow */}
          <div
            className="memory-dynamic-glow"
            style={{
              backgroundColor: currentMem.accentColor || "var(--peach-400)",
            }}
            aria-hidden="true"
          />

          {/* Floating Reaction Hearts */}
          <div className="floating-love-container" aria-hidden="true">
            {floatingReactions.map((p) => (
              <span
                key={p.id}
                className="floating-heart-particle"
                style={{
                  left: `${p.x}%`,
                  "--offset-y": `${p.offsetY}px`,
                  "--rot": `${p.rotate}deg`,
                }}
              >
                {p.icon}
              </span>
            ))}
          </div>

          {/* Main Clean Photo Card */}
          <div className="memory-clean-card-wrap">
            <div className={`memory-photo-flipper slide-dir-${slideDirection}`} key={currentIndex}>
              <div className="polaroid-main-frame">
                <ImageWithFallback
                  src={currentMem.image}
                  alt={currentMem.title}
                  fallbackEmoji="📷"
                  fallbackText="Memory"
                  fallbackGradient="linear-gradient(135deg, #FFE5D9 0%, #FFFFFF 100%)"
                  className="polaroid-main-img is-auto-animating"
                  style={{
                    objectPosition: currentMem.objectPosition || "center center",
                  }}
                />

                {/* Subtle vignette lens overlay */}
                <div className="polaroid-photo-vignette" />

                {/* Quick-tap Heart React Button floating on bottom-right of photo */}
                <button
                  type="button"
                  className="photo-heart-overlay-btn"
                  onClick={handleTriggerLove}
                  title="Send love"
                  aria-label="Send love reaction"
                >
                  <span className="heart-icon">❤️</span>
                  {currentLove > 0 && <span className="heart-count-pill">+{currentLove}</span>}
                </button>
              </div>
            </div>
          </div>

          {/* Left & Right Side Navigation Arrows */}
          <button
            type="button"
            className="memory-side-nav-btn nav-prev"
            onClick={handlePrev}
            aria-label="Previous photo"
            title="Previous photo"
          >
            ‹
          </button>
          <button
            type="button"
            className="memory-side-nav-btn nav-next"
            onClick={() => handleNext(false)}
            aria-label="Next photo"
            title="Next photo"
          >
            ›
          </button>
        </div>

      </div>

      {/* Fullscreen High-Res Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="memory-lightbox-backdrop"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={currentMem.title}
        >
          <div className="lightbox-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close full view"
            >
              ✕
            </button>

            <div className="lightbox-image-wrap">
              <img
                src={currentMem.image}
                alt={currentMem.title}
                className="lightbox-img"
                style={{ objectPosition: currentMem.objectPosition || "center center" }}
              />
            </div>

            <div className="lightbox-nav-row">
              <button
                type="button"
                className="lightbox-nav-btn"
                onClick={handlePrev}
                aria-label="Previous photo"
              >
                ‹ Prev
              </button>
              <span className="lightbox-counter">
                {currentIndex + 1} / {memories.length}
              </span>
              <button
                type="button"
                className="lightbox-nav-btn"
                onClick={() => handleNext(false)}
                aria-label="Next photo"
              >
                Next ›
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
