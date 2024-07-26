import React, { useEffect, useState } from "react";
import "../../styles/Job/Banner.css";

import slide2 from "../../assets/images/slide2.png";
import slide3 from "../../assets/images/slide3.png";
import slide1 from "../../assets/images/slide5.png";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: slide1, url: "https://www.saramin.co.kr/zf_user/jobs/relay/view?isMypage=no&rec_idx=47997171&recommend_ids=eJxNj8kNwEAIA6vJn8PmeKeQ9N9FVonE7nMEHgOKGlR7SvXKGwUxGp8W%2B5Hu2WsqH3qF0GfZCK3cWVORQwVVYGH82eiGD9LJPIoC6jHouUw1y%2BiuljFTZF29VWho794IlyMLScS8QM3IPMxLzJ1lwrCLPKO%2FF15YukBi&view_type=list&gz=1&t_ref_content=SRI_050_TOP100_PAY_RCT&t_ref=hot100&referNonce=9576f0dd596b16a2b943&relayNonce=3fa83a433295807f0f3e&immediately_apply_layer_open=n#seq=0" },
    { image: slide2, url: "https://www.saramin.co.kr/zf_user/jobs/relay/view?isMypage=no&rec_idx=48552034&recommend_ids=eJxdj8ENBDEIA6u5fww2gfcVkv67OGm1Cuieg0cYmCYi90ngs79MyZF%2BatkfHj4Dd6Ovq7Mqq1Esoi7aFle0HNRIlVVhXUWP5Z3GJschF99DBOTS2A3AJpo6lblUE9M7dYZXNxuwKltGCKMoEzY%2FpuyRf666R98%3D&view_type=list&gz=1&t_ref_content=job&t_ref=hot100&relayNonce=696461ced06a4f1aaf38&immediately_apply_layer_open=n#seq=0" },
    { image: slide3, url: "https://www.saramin.co.kr/zf_user/jobs/relay/view?isMypage=no&rec_idx=48577419&recommend_ids=eJxNj8ENBDEIA6u5PwabwPsKSf9d3GlXCnmOxmCZ5SJq7QI%2B68uSIpi7zR%2BMcIYdy%2B7qQbGJPuhLtBybsOzzanDzfZbUdS1GWkxV%2BgrNNVCmywLwG11j5SH1jRVj%2F%2Fuip8gB65owUriKquD3Ysqf8A%2FeAEP%2F&view_type=list&gz=1&t_ref_content=job&t_ref=hot100&relayNonce=2f2b05ba23ae7e56f20f&immediately_apply_layer_open=n#seq=0" },
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
          <a href={slide.url} target="_blank" rel="noopener noreferrer">
            <img src={slide.image} alt={`Slide ${index + 1}`} />
          </a>
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