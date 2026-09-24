import React, { useState, useRef } from "react";
import { birthdayConfig } from "../birthdayConfig";
import { playPop, playChime } from "../utils/audio";

export default function StepFunnyVideos() {
  const { name, videosSection } = birthdayConfig;
  const videos = videosSection.videos;

  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState({});
  const [reactions, setReactions] = useState({});

  const videoRef = useRef(null);
  const currentVideo = videos[activeVideoIdx];

  const handleSelectClip = (index) => {
    if (index === activeVideoIdx) return;
    setIsPlaying(false);
    setActiveVideoIdx(index);
    playChime();
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) {
      // Toggle simulated playback if no real video element loaded
      setIsPlaying(!isPlaying);
      playPop(!isPlaying);
      return;
    }

    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If browser restricts autoplay/video fails
          setIsPlaying(false);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleReaction = (emoji) => {
    const key = `${currentVideo.id}-${emoji}`;
    setReactions((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
    playPop(true);
  };

  const hasFailed = videoError[currentVideo.id];

  return (
    <section className="scene step-videos" aria-labelledby="videos-heading">
      <div className="scene-content">
        {/* Section Header */}
        <div className="section-header">
          <div className="pill-badge">
            <span>{videosSection.badge || "Caught In 4K 🎬"}</span>
          </div>
          <h2 id="videos-heading" className="section-title">
            {videosSection.heading}
          </h2>
          <p className="section-subtitle">
            {videosSection.subheading.replace("[COUSIN_NAME]", name)}
          </p>
        </div>

        {/* Video Clip Pill Tabs */}
        <div className="video-tabs-bar" role="tablist" aria-label="Funny clips selector">
          {videos.map((vid, idx) => {
            const isActive = idx === activeVideoIdx;
            return (
              <button
                key={vid.id || idx}
                type="button"
                className={`video-tab-btn ${isActive ? "active" : ""}`}
                onClick={() => handleSelectClip(idx)}
                role="tab"
                aria-selected={isActive}
                aria-label={`View clip ${idx + 1}: ${vid.title}`}
              >
                <span className="video-tab-emoji">{vid.placeholderEmoji || "📹"}</span>
                <span className="video-tab-name">Clip {idx + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Main Video Cinema Card */}
        <article className="video-cinema-card" aria-label={currentVideo.title}>
          {/* Top Card Meta */}
          <div className="cinema-card-top">
            <span className="cinema-tag">{currentVideo.tag}</span>
            <span className="cinema-duration">⏱️ {currentVideo.duration}</span>
          </div>

          {/* Screen / Player Area */}
          <div className="cinema-screen" onClick={handleTogglePlay}>
            {!hasFailed ? (
              <video
                ref={videoRef}
                key={currentVideo.videoUrl}
                src={currentVideo.videoUrl}
                poster={currentVideo.poster}
                className="cinema-video-element"
                playsInline
                preload="metadata"
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={() => {
                  setVideoError((prev) => ({ ...prev, [currentVideo.id]: true }));
                  setIsPlaying(false);
                }}
              />
            ) : (
              /* Graceful Simulated Player / Fallback Poster */
              <div
                className="cinema-fallback-player"
                style={{
                  background: currentVideo.accent || "linear-gradient(135deg, #FF6B6B 0%, #FFA07A 100%)",
                }}
              >
                {currentVideo.poster && (
                  <img
                    src={currentVideo.poster}
                    alt={currentVideo.title}
                    className="cinema-poster-preview"
                  />
                )}

                <div className="cinema-play-overlay">
                  <div className={`cinema-play-icon-ring ${isPlaying ? "pulse-subtle" : ""}`}>
                    <span className="cinema-play-symbol">{isPlaying ? "⏸" : "▶"}</span>
                  </div>
                  <span className="cinema-play-hint">
                    {isPlaying ? "Playing preview simulation…" : "Tap to test player"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Caption & Info */}
          <div className="cinema-card-details">
            <h3 className="cinema-video-title">{currentVideo.title}</h3>
            <p className="cinema-video-caption">
              “{currentVideo.caption.replace("[COUSIN_NAME]", name)}”
            </p>

            {/* Micro-Reactions */}
            <div className="cinema-reactions-row">
              <span className="reactions-label">Live Reactions:</span>
              <div className="reaction-pills">
                {["🤣", "💀", "👏", "❤️"].map((emoji) => {
                  const count = reactions[`${currentVideo.id}-${emoji}`] || 0;
                  return (
                    <button
                      key={emoji}
                      type="button"
                      className="reaction-pill-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReaction(emoji);
                      }}
                      aria-label={`React with ${emoji}`}
                    >
                      <span>{emoji}</span>
                      {count > 0 && <span className="reaction-count">{count}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </article>

        {/* Helpful configuration guide note */}
        {videosSection.tip && (
          <p className="videos-footer-tip">{videosSection.tip}</p>
        )}
      </div>
    </section>
  );
}
