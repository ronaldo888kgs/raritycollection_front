import React from "react";
import "./SlideContents.scss";
import { Link } from 'react-router-dom';

interface SlideProps {
  index: number;
  title: string;
  subtitle: string;
  image: string;
  url: string;
  label: string;
  currentIdx: number;
  setIsMouseHovering: (
    value: boolean | ((prevIsMouseHovering: boolean) => boolean)
  ) => void;
}

const SlideContents: React.FC<SlideProps> = ({
  index,
  title,
  subtitle,
  image,
  url,
  label,
  currentIdx,
  setIsMouseHovering,
}: SlideProps) => {
  return (
    <>
      {index === currentIdx && (
        <div
          className="slideImg"
          onMouseEnter={() => setIsMouseHovering(true)}
          onMouseLeave={() => setIsMouseHovering(false)}
        >
          <img src={'/images/slideshow/' + image} alt="running img" />
          <h3 className="imgTitle">{title}</h3>
          <Link to={url} className='imgButton'>{label}</Link>
        </div>
      )}
    </>
  );
};

export default SlideContents;
