import React, { useState, useEffect } from "react";
import "../../styles/Job/Banner.css";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://via.placeholder.com/1200x300?text=Slide+1",
    "https://via.placeholder.com/1200x300?text=Slide+2",
    "https://via.placeholder.com/1200x300?text=Slide+3",
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000);

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <div className="banner-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`banner-slide ${index === currentSlide ? "active" : ""}`}
        >
          <img src={slide} alt={`Slide ${index + 1}`} />
        </div>
      ))}
      <div className="banner-controls">
        <button onClick={prevSlide}>&lt;</button>
        <button onClick={nextSlide}>&gt;</button>
      </div>
    </div>
  );
};

export default Banner;