'use client';
import React, { useEffect, useState } from 'react';

export const BackgroundImageTransition = ({ interval = 3000, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, images.length]);

  return (
    <>
      {images.map((image, index) => (
        <img
          src={image}
          key={index}
          alt=""
          className="absolute inset-0 size-full object-cover"
          style={{
            transition: `transform ${interval}ms ease-out, opacity ${interval}ms`,
            transform:
              index === currentImageIndex ? `scale(1.2,1.2)` : `scale(1.3,1.3)`,
            opacity: index === currentImageIndex ? 0.8 : 0,
            filter: `grayscale(1%)`,
            zIndex: index === currentImageIndex ? -1 : -2,
          }}
        />
      ))}
    </>
  );
};
