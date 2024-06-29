"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { images } from "./pub_constants";
import PubDescription from "./Pub_description";
import {Corporation as CorporationType} from "@/types/corporation";

interface PubSliderProps{
    corporations: CorporationType
  };
const PubSlider:React.FC <PubSliderProps> = ({corporations}) => {
  const [activeImage, setActiveImage] = useState(0);

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
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [activeImage]);
  return (
    <main className="grid place-items-center md:grid-cols-2 grid-cols-1 w-full mx-auto max-w-5xl shadow-2xl rounded-2xl relative">
      <div><h3 className="font-bold text-3xl">La satr du jour </h3></div>
      <div
        className={`w-full flex justify-center items-center gap-4 transition-transform ease-in-out duration-500 md:rounded-2xl p-6 md:p-0`}
      >
        
        {corporations.images.map((elem, idx) => (
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