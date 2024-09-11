import React, { useState } from "react";

export default function HomeImageSlider({ slides }) {
      const [currentIndex, setCurrentIndex] = useState(0);
    
      const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
      };
    
      const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
      };
    
      return (
        <div style={sliderStyles}>
          <div style={leftArrowStyles} onClick={prevSlide}>
            &#10094;
          </div>
          <div style={rightArrowStyles} onClick={nextSlide}>
            &#10095;
          </div>
          {slides.map((slide, index) => (
            <div
              key={index}
              style={{
                ...slideContainerStyles,
                display: index === currentIndex ? "flex" : "none",
              }}
            >
              {slide.map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  style={{
                    ...imageStyles,
                    backgroundImage: `url(${image})`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      );
    };
    
    const sliderStyles = {
      position: "relative",
      height: "150px",
      width: "100%",
      overflow: "hidden",
    };
    
    const slideContainerStyles = {
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    };
    
    const imageStyles = {
      height: "100%",
      width: "auto",
      flex: "1",
      backgroundSize: "cover",
      backgroundPosition: "center",
      margin: "0 5px",
    };
    
    const arrowStyles = {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "2rem",
      color: "#fff",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: "0.5rem",
      cursor: "pointer",
      zIndex: 1000,
    };
    
    const leftArrowStyles = {
      ...arrowStyles,
      left: "10px",
    };
    
    const rightArrowStyles = {
      ...arrowStyles,
      right: "10px",
    };
    