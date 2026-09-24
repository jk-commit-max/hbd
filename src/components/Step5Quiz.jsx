import React, { useState, useEffect, useRef } from "react";
import { birthdayConfig } from "../birthdayConfig";
import { playPop, playCelebrationFanfare } from "../utils/audio";
import { confetti } from "../utils/confetti";

export default function Step5Quiz({ onCompleteQuiz }) {
  const { name, quizSection } = birthdayConfig;
  const currentQ = quizSection.questions[0];

  const [selectedOption, setSelectedOption] = useState(null);
  const [wrongMessage, setWrongMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [shakeIndex, setShakeIndex] = useState(null);
  const timerRef = useRef(null);

  // Clean up any pending advance timer if component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSelectOption = (optIdx) => {
    if (isCorrect) return; // Already passed and transitioning

    if (optIdx === currentQ.correctIndex) {
      // Picked Sai Bharath!
      setSelectedOption(optIdx);
      setIsCorrect(true);
      setWrongMessage("");
      setShakeIndex(null);
      playPop(true);
      playCelebrationFanfare();
      confetti.burst({ count: 70, originX: 0.5, originY: 0.5 });

      // Automatically advance to the next stage after celebration
      timerRef.current = setTimeout(() => {
        onCompleteQuiz();
      }, 1600);
    } else {
      // Picked a generic option (Gulab Jamun / Chocolate / Strawberries)
      playPop(false);
      setShakeIndex(optIdx);
      setSelectedOption(optIdx);
      setWrongMessage("❌ Sweet, but definitely NOT the sweetest! 😉");

      // Reset shake animation after 450ms so it can re-trigger if needed
      setTimeout(() => {
        setShakeIndex(null);
      }, 450);
    }
  };

  const handleProceedNow = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    onCompleteQuiz();
  };

  return (
    <section className="scene step-quiz" aria-labelledby="quiz-heading">
      <div className="scene-content">
        {/* Header */}
        <div className="section-header">
          <div className="pill-badge">
            <span>Quiz 📝</span>
          </div>
          <h2 id="quiz-heading" className="section-title">
            {quizSection.heading}
          </h2>
          <p className="section-subtitle">
            {quizSection.subheading.replace("[COUSIN_NAME]", name)}
          </p>
        </div>

        {/* Question Card */}
        <div className="quiz-card-container">
          {/* Tracker header */}
          <div className="quiz-tracker-row">
            <span className="quiz-step-count">
              ⭐ Sweetness Verification
            </span>
            <span className="quiz-badge-mini">100% Certified</span>
          </div>

          {/* Question Title */}
          <h3 className="quiz-question-text">
            {currentQ.question.replace("[COUSIN_NAME]", name)}
          </h3>

          {/* 4 Options */}
          <div className="quiz-options-list" role="radiogroup">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isOptionCorrect = optIdx === currentQ.correctIndex;
              const isShaking = shakeIndex === optIdx;

              let optionClass = "quiz-option-btn";
              if (isCorrect && isOptionCorrect) {
                optionClass += " is-correct glow-correct";
              } else if (isSelected && !isOptionCorrect) {
                optionClass += " is-wrong";
              }
              if (isShaking) {
                optionClass += " is-wrong-shake";
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  className={optionClass}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isCorrect}
                  role="radio"
                  aria-checked={isSelected}
                >
                  <span className="quiz-option-letter">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="quiz-option-label">
                    {option.replace("[COUSIN_NAME]", name)}
                  </span>
                  {isCorrect && isOptionCorrect && (
                    <span className="quiz-option-check">✓ 👑</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Wrong selection feedback banner */}
          {wrongMessage && !isCorrect && (
            <div className="quiz-wrong-feedback">
              <span>{wrongMessage}</span>
            </div>
          )}

          {/* Correct celebration banner & Proceed button */}
          {isCorrect && (
            <div className="quiz-feedback-card animate-slide-up">
              <p className="quiz-feedback-text">
                {currentQ.explanation.replace("[COUSIN_NAME]", name)}
              </p>
              <button
                type="button"
                className="quiz-continue-btn glow-effect"
                onClick={handleProceedNow}
              >
                Proceed to Make a Wish 🎂 →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
