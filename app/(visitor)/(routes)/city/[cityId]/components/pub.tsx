"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import PubDescription from "./Pub_description";
import {Corporation as CorporationType} from "@/types/corporation";

interface PubSliderProps{
    corporations: CorporationType
  };
const PubSlider:React.FC <PubSliderProps> = ({corporations}) => {
  const [activeImage, setActiveImage] = useState(0);

  const images = corporations?.images?.length > 0 ? corporations.images : [{ url: "/default_image.jpg" }];

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
  }, [clickNext]);
  
  return (
    <main className="grid place-items-center md:grid-cols-2 grid-cols-1 w-full mx-auto max-w-5xl shadow-2xl rounded-2xl relative">
      <div
        className={`w-full flex justify-center items-center gap-4 transition-transform ease-in-out duration-500 md:rounded-2xl p-6 md:p-0`}
      >
        
        {images.map((elem, idx) => (
          <div
            key={idx}
            className={`${
              idx === activeImage
                ? "block w-full h-[80vh] object-cover transition-all duration-500 ease-in-out"
                : "hidden"
            }`}
          >
            <Image
              src={elem.url}
              alt=""
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
          
        ))}
      </div>
      <PubDescription
        activeImage={activeImage}
        clickNext={clickNext}
        clickPrev={clickPrev}
        data={corporations}
      />
    </main>
  );
};

export default PubSlider;