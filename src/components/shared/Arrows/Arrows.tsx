import React from "react";
import "./Arrows.scss";

interface ArrowProps {
  goToPrevSlide: () => void;
  goToNextSlide: () => void;
}

const Arrows: React.FC<ArrowProps> = ({
  goToPrevSlide,
  goToNextSlide,
}: ArrowProps) => {
  return (
    <div className="arrows">
      <span className="prev" onClick={goToPrevSlide}>
        &#10094;
      </span>
      <span className="next" onClick={goToNextSlide}>
        &#10095;
      </span>
    </div>
  );
};

export default Arrows;
