import React, { useEffect, useState, useRef } from 'react';
import { nanoid } from 'nanoid';

interface Props {
  images: string[];
}

export default function ImageSlider({ images }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const TOTAL_SLIDES = images.length - 1;

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);
  return (
    <div className="w-full overflow-hidden relative">
      <div className="w-full flex" ref={slideRef}>
        {images.map(img => (
          <img src={img} alt="" key={nanoid()} />
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            type="button"
            className="absolute left-4 top-1/2"
            style={{ transform: 'translateY(-50%)' }}
          >
            <img className="w-4 h-8 mx-auto" alt="to left" src="../../static/to-left.png" />
          </button>
          <button
            onClick={nextSlide}
            type="button"
            className="absolute right-4 top-1/2"
            style={{ transform: 'translateY(-50%)' }}
          >
            <img className="w-4 h-8 mx-auto" alt="to left" src="../../static/to-right.png" />
          </button>
        </>
      )}
    </div>
  );
}
