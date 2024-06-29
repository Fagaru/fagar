"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { City as cityType } from '@/types/city';
import React from "react"

import left from "@/public/left.svg";
import right from "@/public/right.svg";
interface SliderProps{
  data: cityType
};

const Slider:React.FC <SliderProps> = ({
  data
}) => {
  const [activeImage, setActiveImage] = useState(0);
  const images=data.images;
  const clickNext = () => {
    activeImage === images.length - 1
      ? setActiveImage(0)
      : setActiveImage(activeImage + 1);
  };
  const clickPrev = () => {
    activeImage === 0
      ? setActiveImage(images.length - 1)
      : setActiveImage(activeImage - 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      clickNext();
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [activeImage]);
  return (
    <main className="grid place-items-center md:grid-cols-1  ">
      <div
        className={`w-full flex justify-center items-center gap-4 transition-transform ease-in-out duration-500  p-6 md:p-0 place-items-start  relative`}
      >
        {images.map((elem, idx) => (
          <div
            key={idx}
            className={`${
              idx === activeImage
                ? "block w-full h-[50vh] object-cover transition-all duration-500 ease-in-out"
                : "hidden"
            }`}
          >
            <Image
              src={elem.url}
              alt=""
              width={400}
              height={400}
              className="w-full h-full object-cover "
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

          <div className="absolute md:bottom-1 bottom-10 right-10 md:right-0 w-full flex justify-center items-center">
                    <div className="absolute  bottom-60 left-100 font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-white text-center">
                        Bienvenue à {data.label}
                    </div>
            <div
              className="absolute bottom-60 left-5 cursor-pointer"
              onClick={clickPrev}
            >
              <Image src={left} alt="" />
            </div>

            <div
              className="absolute bottom-60 right-5 cursor-pointer"
              onClick={clickNext}
            >
              <Image src={right} alt="" />
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