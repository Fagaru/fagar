
import React from "react";
import {Corporation as CorporationType} from "@/types/corporation"


type Props = {
  activeImage: any;
  clickNext: any;
  clickPrev: any;
  data:CorporationType;
};

const PubDescription = ({ activeImage, clickNext, clickPrev,data}: Props) => {
  const images=[data];
  return (
    <div className="">
      {data.description}
    </div>
  );
};

export default PubDescription;


{/* {images.map((elem, idx) => (
        <div
          key={idx}
          className={`${
            idx === activeImage
              ? "block w-full h-full md:h-[80vh] py-20 md:px-20 px-10 text-left"
              : "hidden"
          }`}
        >
          <motion.div
            initial={{
              opacity: idx === activeImage ? 0 : 0.5,
              scale: idx === activeImage ? 0.5 : 0.3,
            }}
            animate={{
              opacity: idx === activeImage ? 1 : 0.5,
              scale: idx === activeImage ? 1 : 0.3,
            }}
            transition={{
              ease: "linear",
              duration: 2,
              x: { duration: 1 },
            }}
            className="w-full"
          >
            <div className="py-16 text-5xl font-extrabold">{elem.name}</div>
            <div className="leading-relaxed font-medium text-base tracking-wide h-60 md:h-40 italic text-gray-600">
              {" "}
              {elem.description}
            </div>
          </motion.div>

          <button className="bg-[#ecae7e] text-white uppercase px-4 py-2 rounded-md my-10">
            order now
          </button>
          <div className="absolute md:bottom-1 bottom-10 right-10 md:right-0 w-full flex justify-center items-center">
            <div
              className="absolute bottom-2 right-10 cursor-pointer"
              onClick={clickPrev}
            >
              <Image src={left} alt="" />
            </div>

            <div
              className="absolute bottom-2 right-2 cursor-pointer"
              onClick={clickNext}
            >
              <Image src={right} alt="" />
            </div>
          </div>
        </div>
      ))} */}