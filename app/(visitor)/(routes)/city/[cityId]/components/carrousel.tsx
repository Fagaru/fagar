"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

import { City as cityType } from '@/types/city';
import React from "react";

import left from "@/public/left.svg";
import right from "@/public/right.svg";

interface SliderProps {
  data: cityType;
}

const Slider: React.FC<SliderProps> = ({ data }) => {
  const [activeImage, setActiveImage] = useState(0);
  const images = data?.images?.length > 0 ? data.images : [{ url: "/default_city.jpg" }];

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
    <main className="grid place-items-center  md:grid-cols-1">
      <div className="w-full flex justify-center items-center transition-transform ease-in-out duration-500">
        {images.map((elem, idx) => (
          <div
            key={idx}
            className={`${
              idx === activeImage
                ? "block w-full h-[30vh] object-cover transition-all duration-500 ease-in-out"
                : "hidden"
            }`}
          >
            <Image
              src={elem.url || "/default_image.jpg"}
              alt="city picture"
              width={400}
              height={400}
              className="relative w-full h-full object-cover"
            />
            {images.map((elem, idx) => (
              <div
                key={idx}
                className={`${
                  idx === activeImage
                    ? "block w-full h-full md:h-[50vh] py-20 md:px-20 px-10 text-left"
                    : "hidden"
                }`}
              >
                <div className="relative w-full flex justify-center items-center mt-12">
                  <div className="absolute bottom-60 left-100 font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-white text-center">
                  <div className="text-white text-center ">
          <h1 className=" text-4xl md:text-6xl font-bold">Bienvenue à {data?.label}</h1>
        </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Slider;
