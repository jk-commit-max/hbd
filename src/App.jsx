import React, { useState, useEffect } from "react";
import { birthdayConfig } from "./birthdayConfig";
import FloatingParticles from "./components/FloatingParticles";
import ProgressBar from "./components/ProgressBar";
import NavigationControls from "./components/NavigationControls";
import Step1Welcome from "./components/Step1Welcome";
import Step2Legends from "./components/Step2Legends";
import Step3Reasons from "./components/Step3Reasons";
import Step5Quiz from "./components/Step5Quiz";
import Step5Memories from "./components/Step5Memories";
import Step6Wish from "./components/Step6Wish";
import Step7Surprise from "./components/Step7Surprise";
import { playChime, toggleAudioMute, getAudioMuted } from "./utils/audio";
import "./App.css";

const TOTAL_STEPS = 7;

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [transitionDir, setTransitionDir] = useState("forward");
  const [isMuted, setIsMuted] = useState(false);

  // Set document title
  useEffect(() => {
    document.title = `Happy Birthday ${birthdayConfig.name}! 🎉`;
  }, []);

  const goToStep = (stepNum) => {
    if (stepNum < 1 || stepNum > TOTAL_STEPS) return;
    setTransitionDir(stepNum > currentStep ? "forward" : "backward");
    setCurrentStep(stepNum);
    playChime();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      goToStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  const handleReplay = () => {
    setTransitionDir("backward");
    setCurrentStep(1);
    playChime();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleMute = () => {
    const muted = toggleAudioMute();
    setIsMuted(muted);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight") {
        if (currentStep !== 1 && currentStep !== 4 && currentStep !== 6 && currentStep !== 7) {
          handleNext();
        }
      } else if (e.key === "ArrowLeft") {
        if (currentStep > 1) {
          handlePrev();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep]);

  // Labels for bottom navigation
  const getNextLabel = () => {
    switch (currentStep) {
      case 2:
        return "Why He's So Sweet →";
      case 3:
        return "Take the Quiz →";
      case 4:
        return "Down Memory Lane 📸 →";
      case 5:
        return "Make a Wish 🎂 →";
      case 6:
        return "One Last Thing 🎁 →";
      default:
        return "Next Story →";
    }
  };

  return (
    <div className="app-viewport">
      {/* Background ambient particles & warm glow */}
      <FloatingParticles />

      {/* Mobile-optimized App Shell */}
      <div className="mobile-shell">
        {/* Subtle Progress Bar & Audio Mute (Visible across all steps) */}
        <ProgressBar
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          onStepClick={goToStep}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />

        {/* Dynamic Story Stage Container with smooth transition */}
        <main
          className={`story-stage stage-transition-${transitionDir}`}
          key={currentStep}
        >
          {currentStep === 1 && (
            <Step1Welcome onStart={handleNext} />
          )}

          {currentStep === 2 && (
            <Step2Legends />
          )}

          {currentStep === 3 && (
            <Step3Reasons />
          )}

          {currentStep === 4 && (
            <Step5Quiz onCompleteQuiz={handleNext} />
          )}

          {currentStep === 5 && (
            <Step5Memories onNext={handleNext} />
          )}

          {currentStep === 6 && (
            <Step6Wish onNext={handleNext} />
          )}

          {currentStep === 7 && (
            <Step7Surprise onReplay={handleReplay} />
          )}
        </main>

        {/* Thumb-friendly Bottom Navigation */}
        {currentStep > 1 && currentStep < 7 && (
          <NavigationControls
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            onPrev={handlePrev}
            onNext={handleNext}
            nextLabel={getNextLabel()}
            hideNext={currentStep === 4 || currentStep === 6} // On step 4 (Quiz) and 6 (Make a Wish), user must interact with stage
          />
        )}
      </div>
    </div>
  );
}
