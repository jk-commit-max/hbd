import React, { useState } from "react";

export default function ImageWithFallback({
  src,
  alt = "",
  fallbackEmoji = "📸",
  fallbackText = "Photo",
  fallbackGradient = "linear-gradient(135deg, #FFE5D9 0%, #FFCAD4 100%)",
  className = "",
  objectPosition = "center 15%",
  objectFit = "cover",
  style = {},
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`image-fallback-placeholder ${className}`}
        style={{ background: fallbackGradient }}
        aria-label={alt}
      >
        <span className="fallback-emoji">{fallbackEmoji}</span>
        {fallbackText && <span className="fallback-text">{fallbackText}</span>}
      </div>
    );
  }

  return (
    <div className={`image-wrapper ${className}`}>
      {!isLoaded && (
        <div
          className="image-skeleton"
          style={{ background: fallbackGradient }}
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`loaded-image ${isLoaded ? "is-visible" : "is-hidden"}`}
        style={{ objectPosition, objectFit, ...style }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        loading="lazy"
      />
    </div>
  );
}
