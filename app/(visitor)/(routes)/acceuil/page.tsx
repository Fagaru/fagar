

"use client";
// import { useRouter } from 'next/navigation';
// import MapBoxApiKeyWrapper from "@/providers/map-box-apikey-wrapper";
import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { useLoadScript } from "@react-google-maps/api";
import GoGetMyPosition from "@/hooks/get-my-position";

import getCities from '@/services/getCities';
import { useRouter, useSearchParams } from "next/navigation";


import { cn } from "@/lib/utils";

import { 
    LocateFixed, 
    MapPin
} from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import useLocation from "@/hooks/use-location";
import MapBoxApiKeyWrapper from "@/providers/map-box-apikey-wrapper";
import { Heading } from "@/components/ui/heading";






const HomePage: React.FC = () => {

  
    return(
   
    //   <div className="flex-grow flex items-center justify-center">
      <MapBoxApiKeyWrapper/>
//       <div>
//       <Heading
//                 title="Fagar"
//                 description=""
//             />
//       </div>

//   </div> 
    );
}
export default HomePage;

