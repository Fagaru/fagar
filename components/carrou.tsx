"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import React from "react";
import { City as cityType } from '@/types/city';
import MapBox from '@/providers/map-box';

interface SliderProps {
  data: cityType;
}

const Slider: React.FC<SliderProps> = ({ data }) => {
  const [activeImage, setActiveImage] = useState(0);

  const images = 
     [
        { url: "/images/beach-418742.jpg" },
        { url: "/images/landscape-7438429.jpg" },
        { url: "/images/mountain-landscape-2031539.jpg" },
        { url: "/images/sculpture-7499732.jpg" },
        { url: "/images/mountains-8451480.jpg" },
        { url: "/images/sea-164989_1920.jpg" },
        { url: "/images/vineyard-8345243.jpg" },
        { url: "/images/waterfall-8350178.jpg" }
      ];

  const clickNext = useCallback(() => {
    setActiveImage((prevActiveImage) =>
      prevActiveImage === images.length - 1 ? 0 : prevActiveImage + 1
    );
  }, [images.length]);

  const clickPrev = () => {
    setActiveImage((prevActiveImage) =>
      prevActiveImage === 0 ? images.length - 1 : prevActiveImage - 1
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      clickNext();
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [clickPrev]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((elem, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === activeImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={elem.url || "/images/default_image.jpg"}
            alt="city picture"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-0"
          />
        </div>
      ))}


    </div>
  );
};

export default Slider;
