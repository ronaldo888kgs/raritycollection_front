import React, { useEffect, useState } from "react";
import { ImageData } from "../ImageData";
import SlideContents from "../../shared/SlideContents/SlideContents";
import Arrows from "../../shared/Arrows/Arrows";
import Dots from "../../shared/Dots/Dots";
import "./CarouselSlider.scss";

const CarouselSlider: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isMouseHovering, setIsMouseHovering] = useState<boolean>(false);
  const length: number = ImageData.length;

  // slide
  const goToPrevSlide = (): void => {
    setCurrentIdx(currentIdx === 0 ? length - 1 : currentIdx - 1);
  };

  const goToNextSlide = (): void => {
    setCurrentIdx(currentIdx === length - 1 ? 0 : currentIdx + 1);
  };

  // autoslide
  useEffect(() => {
    if (isMouseHovering) {
      return;
    }
    const timeInterval = setInterval(() => {
      setCurrentIdx(currentIdx === length - 1 ? 0 : currentIdx + 1);
    }, 2000);
    return () => clearInterval(timeInterval);
  }, [currentIdx, isMouseHovering]);

  return (
    <section className="slideContents">
      {ImageData.map((img, idx) => {
        return (
          <SlideContents
            key={idx}
            index={idx}
            title={img.title}
            subtitle={img.subtitle}
            image={img.image}
            url={img.url}
            label={img.label}
            currentIdx={currentIdx}
            setIsMouseHovering={setIsMouseHovering}
          />
        );
      })}
      <div className="dots">
        {ImageData.map((_, idx) => {
          return (
            <Dots
              key={idx}
              index={idx}
              currentIdx={currentIdx}
              setCurrentIdx={setCurrentIdx}
            />
          );
        })}
      </div>
    </section>
  );
};

export default CarouselSlider;
