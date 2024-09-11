import React, { useState } from "react";
import "./ImageSlidertwo.css";

const ImageSlidertwo = ({ imagestwo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= imagestwo.length - 3 ? 0 : prevIndex + 3
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? imagestwo.length - 3 : prevIndex - 3
    );
  };

  return (
    <div className="slider">
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <div className="slider-content">
        {imagestwo.slice(currentIndex, currentIndex + 3).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${currentIndex + index}`}
            className="slider-image"
          />
        ))}
      </div>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default ImageSlidertwo;
