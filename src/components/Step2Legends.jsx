import React, { useRef, useState, useEffect } from "react";
import { birthdayConfig } from "../birthdayConfig";
import ImageWithFallback from "./ImageWithFallback";

export default function Step2Legends() {
  const { name, legendsSection } = birthdayConfig;
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalCards = legendsSection.cards.length;

  const scrollToCard = (index) => {
    if (!carouselRef.current) return;
    const cards = carouselRef.current.querySelectorAll(".legend-card");
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth * 0.82; // approximate card width
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < totalCards && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const nextCard = () => {
    const nextIdx = (activeIndex + 1) % totalCards;
    scrollToCard(nextIdx);
  };

  const prevCard = () => {
    const prevIdx = (activeIndex - 1 + totalCards) % totalCards;
    scrollToCard(prevIdx);
  };

  return (
    <section className="scene step-legends" aria-labelledby="legends-heading">
      <div className="scene-content">
        {/* Section Header */}
        <div className="section-header">
          <div className="pill-badge">
            <span>Fictional Testimonials 📜</span>
          </div>
          <h2 id="legends-heading" className="section-title">
            {legendsSection.heading}
          </h2>
          <p className="section-subtitle">
            {legendsSection.subheading.replace("[COUSIN_NAME]", name)}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="carousel-outer-wrapper">
          <div
            ref={carouselRef}
            className="carousel-track"
            onScroll={handleScroll}
            tabIndex={0}
            aria-label="Fictional legends carousel"
          >
            {legendsSection.cards.map((card, index) => (
              <article
                key={card.id || index}
                className={`legend-card ${index === activeIndex ? "is-active" : ""}`}
                aria-label={`Testimonial from ${card.persona}`}
              >
                {/* Visual Header / Image */}
                <div className="legend-card-media">
                  <ImageWithFallback
                    src={card.image}
                    alt={card.persona}
                    fallbackEmoji={card.emoji}
                    fallbackText={card.persona}
                    fallbackGradient={card.accent}
                    objectPosition={card.objectPosition || "center 15%"}
                    className="legend-img"
                  />
                  <span className="legend-floating-emoji" aria-hidden="true">
                    {card.emoji}
                  </span>
                </div>

                {/* Card Body */}
                <div className="legend-card-body">
                  <div className="legend-badge-row">
                    <span className="legend-category-tag">{card.badge}</span>
                  </div>
                  <h3 className="legend-persona-name">{card.persona}</h3>
                  <blockquote className="legend-quote">
                    “{card.quote.replace("[COUSIN_NAME]", name)}”
                  </blockquote>
                </div>
              </article>
            ))}
          </div>

          {/* Carousel Arrows */}
          <div className="carousel-nav-arrows">
            <button
              type="button"
              className="carousel-arrow prev"
              onClick={prevCard}
              aria-label="Previous legend"
            >
              ‹
            </button>
            <button
              type="button"
              className="carousel-arrow next"
              onClick={nextCard}
              aria-label="Next legend"
            >
              ›
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="carousel-dots" role="tablist" aria-label="Carousel pagination">
            {legendsSection.cards.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`carousel-dot ${idx === activeIndex ? "active" : ""}`}
                onClick={() => scrollToCard(idx)}
                aria-label={`View legend card ${idx + 1}`}
                role="tab"
                aria-selected={idx === activeIndex}
              />
            ))}
          </div>

          <p className="carousel-swipe-hint">Swipe or drag to explore more →</p>
        </div>
      </div>
    </section>
  );
}
