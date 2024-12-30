'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export const BackgroundImageTransition = ({
  className,
  interval = 3000,
  images,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, images.length]);

  return (
    <div className="relative min-h-svh isolate overflow-hidden">
      {images.map((image, index) => (
        <img
          src={image}
          key={index}
          alt=""
          className="absolute inset-0 size-full object-cover md:object-scale-down"
          style={{
            transition: `transform ${interval}ms ease-out, opacity ${interval}ms`,
            transform:
              index === currentImageIndex ? `scale(1.2,1.2)` : `scale(1.3,1.3)`,
            opacity: index === currentImageIndex ? 1 : 0,
            filter: `grayscale(1%)`,
            zIndex: index === currentImageIndex ? 20 : 10,
          }}
        />
      ))}
    </div>
  );

  //   return (
  //     <div
  //       className={cn('min-h-svh relative isolate overflow-hidden', className)}
  //     >
  //       {images.map((image, index) => (
  //         <div
  //           key={index}
  //           className={`absolute size-full object-cover inset-0 transition-opacity`}
  //           style={{
  //             backgroundImage: `url(${image})`,
  //             transition: `transform ${interval}ms ease-out, opacity ${interval}ms`,
  //             transform:
  //               index === currentImageIndex ? `scale(1.1,1.1)` : `scale(1.3,1.3)`,
  //             opacity: index === currentImageIndex ? 1 : 0,
  //             filter: `grayscale(1%)`,
  //             zIndex: index === currentImageIndex ? 20 : 10,
  //           }}
  //         ></div>
  //       ))}
  //     </div>
  //   );
};
