import { useRef, useState, useEffect } from 'react';
import * as React from 'react';

interface IProps {
  src: string;
  // eslint-disable-next-line react/require-default-props
  className?: string;
}

export default function Image({ src, className }: IProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    function loadImage() {
      setIsLoad(true);
    }

    const imgEl = imgRef.current;
    if (imgEl) {
      imgEl.addEventListener(LOAD_IMG_EVENT_TYPE, loadImage);
    }
    return () => {
      if (imgRef) {
        imgEl.removeEventListener(LOAD_IMG_EVENT_TYPE, loadImage);
      }
    };
  }, []);

  useEffect(() => {
    if (!observer) {
      observer = new IntersectionObserver(onIntersection, {
        threshold: 0.1,
      });
    }
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
  }, []);

  return <img ref={imgRef} src={isLoad ? src : '../../../static/placeholder.jpg'} alt="" className={className || ''} />;
}

let observer: IntersectionObserver | null = null;
const LOAD_IMG_EVENT_TYPE = 'loadImage';

function onIntersection(entries: IntersectionObserverEntry[], io: IntersectionObserver) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_TYPE));
    }
  });
}
