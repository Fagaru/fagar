
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

