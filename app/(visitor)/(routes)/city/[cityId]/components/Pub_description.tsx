
import React from "react";
import Link from "next/link";
import {Corporation as CorporationType} from "@/types/corporation"
import { MoveLeft } from 'lucide-react';


type Props = {
  activeImage: any;
  clickNext: any;
  clickPrev: any;
  data:CorporationType;
};

const PubDescription = ({ activeImage, clickNext, clickPrev,data}: Props) => {
  if (!data) {
    return <p>Data is not available</p>; // Vous pouvez personnaliser ce message
  }
  const images=[data];
  const href=`/pros/${data._id}`
  return (
    <div className=" relative xl">

      <Link href={href} className="ml-4 flex lg:ml-0 gap-x-2">
          <MoveLeft />
                    <p className="font-bold text-xl">Découvrir encore plus</p>
               </Link>
      {data?.description}
    </div>
  );
};

export default PubDescription;

