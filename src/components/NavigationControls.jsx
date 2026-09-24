import React from "react";

export default function NavigationControls({
  currentStep,
  totalSteps = 7,
  onPrev,
  onNext,
  nextLabel,
  isNextDisabled = false,
  hideNext = false,
  hidePrev = false,
}) {
  return (
    <footer className="bottom-nav-bar" role="navigation" aria-label="Story Navigation">
      <div className="bottom-nav-inner">
        {/* Previous Button */}
        {currentStep > 1 && !hidePrev ? (
          <button
            type="button"
            className="nav-btn nav-btn-secondary"
            onClick={onPrev}
            aria-label="Go to previous scene"
          >
            <span className="nav-btn-icon">←</span>
            <span className="nav-btn-text">Back</span>
          </button>
        ) : (
          <div className="nav-spacer" />
        )}

        {/* Next / Primary Action Button */}
        {!hideNext && (
          <button
            type="button"
            className={`nav-btn nav-btn-primary ${isNextDisabled ? "disabled" : ""}`}
            onClick={onNext}
            disabled={isNextDisabled}
            aria-label={nextLabel || "Continue to next scene"}
          >
            <span className="nav-btn-text">
              {nextLabel || (currentStep === totalSteps ? "Finish" : "Next →")}
            </span>
          </button>
        )}
      </div>
    </footer>
  );
}
