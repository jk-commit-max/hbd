import React, { useMemo } from "react";

const STAGE_TITLES = [
  "Welcome",
  "Legends",
  "Why So Sweet",
  "Quiz",
  "Make a Wish",
  "One Last Thing",
];

const RIDER_MESSAGES = [
  "Revving up! 🏍️💨",
  "Full throttle! ⚡",
  "Cruising in style! 😎",
  "Quiz time boost! 🚀",
  "Cake reached! 🏆🎉",
  "Time for a surprise! 🎁",
];

export default function ProgressBar({
  currentStep,
  totalSteps = 6,
  onStepClick,
  isMuted,
  onToggleMute,
}) {
  // Calculate motorcycle progress along track (2% to ~78% so front wheel reaches cake at 88%)
  const riderPosition = useMemo(() => {
    if (currentStep <= 1) return 2;
    if (currentStep >= 5) return 78; // Reach the cake at Make a Wish
    // Map intermediate steps smoothly
    const ratio = (currentStep - 1) / (5 - 1);
    return Math.min(78, 2 + ratio * 76);
  }, [currentStep]);

  const hasReachedCake = currentStep >= 5;

  return (
    <header className="story-header" role="banner">
      <div className="story-header-inner">
        {/* Step info & Speedometer title */}
        <div className="step-indicator-wrapper">
          <span className="step-counter">
            Part {currentStep} of {totalSteps}
          </span>
          <span className="step-title-bullet">•</span>
          <span className="step-title-text">{STAGE_TITLES[currentStep - 1]}</span>
        </div>

        {/* Audio Mute/Unmute button */}
        <button
          type="button"
          className="audio-toggle-btn"
          onClick={onToggleMute}
          aria-label={isMuted ? "Unmute celebratory sound effects" : "Mute sound effects"}
          title={isMuted ? "Unmute sounds" : "Mute sounds"}
        >
          {isMuted ? "🔇" : "🔔"}
        </button>
      </div>

      {/* ====================================================================
          🏁 INTERACTIVE BIRTHDAY RACE TRACK 🏍️💨 -> 🎂
          ==================================================================== */}
      <div
        className="race-track-container"
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin="1"
        aria-valuemax={totalSteps}
        aria-label="Birthday journey race track"
      >
        {/* Asphalt Road Lane */}
        <div className="race-track-asphalt">
          {/* Dashed Road Markings */}
          <div className="road-center-stripes" aria-hidden="true" />

          {/* Starting Line Gate */}
          <div className="start-line-gate" title="Start Line">
            <span className="gate-flag">🏁</span>
          </div>

          {/* Milestones along track */}
          <div className="track-milestones">
            {Array.from({ length: totalSteps }).map((_, idx) => {
              const stepNum = idx + 1;
              const isPast = stepNum < currentStep;
              const isCurrent = stepNum === currentStep;

              return (
                <button
                  key={stepNum}
                  type="button"
                  className={`track-milestone-marker ${isCurrent ? "current" : ""} ${
                    isPast ? "passed" : ""
                  }`}
                  onClick={() => {
                    if (stepNum <= currentStep && onStepClick) {
                      onStepClick(stepNum);
                    }
                  }}
                  aria-label={`Jump to stage ${stepNum}: ${STAGE_TITLES[idx]}`}
                  title={`${STAGE_TITLES[idx]} (Part ${stepNum})`}
                >
                  <span className="milestone-dot" />
                </button>
              );
            })}
          </div>

          {/* Sai Barath on his Royal Enfield Motorcycle */}
          <div
            className={`rider-vehicle-wrap ${currentStep > 1 ? "is-accelerating" : ""}`}
            style={{ left: `${riderPosition}%` }}
          >
            {/* Speed speech bubble */}
            <div className="rider-speech-bubble" aria-hidden="true">
              <span>{RIDER_MESSAGES[currentStep - 1] || "Speeding! 🏍️"}</span>
            </div>

            {/* Exhaust smoke puff animation */}
            <span className="exhaust-smoke-puff" aria-hidden="true">
              💨
            </span>

            {/* Royal Enfield Bullet Rider Image */}
            <img
              src="/images/rider-bullet.png"
              alt="Sai Barath on Royal Enfield"
              className="rider-bullet-img"
            />
          </div>

          {/* Finish Line with Birthday Cake 🎂 */}
          <div className={`finish-line-goal ${hasReachedCake ? "goal-reached" : ""}`}>
            <div className="checkered-finish-tape" aria-hidden="true" />
            <div className="finish-cake-icon-wrap" title="Finish Line: Birthday Cake!">
              <span className="finish-cake-emoji">🎂</span>
              {hasReachedCake && <span className="cake-sparkle-stars">✨</span>}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
