"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import React from "react";
import { City as cityType } from '@/types/city';
// import MapBox from '@/providers/map-box'; 
import SearchBar from "@/components/searchBar";
import HomeSearchBar from "./homeSearch";

import dynamic from 'next/dynamic'
 
const NoSSR = dynamic(() => import('@/providers/map-box-apikey-wrapper'), { ssr: false })

const Search  = () => {
  

  return (
    <div className="relative p-10 w-full h-full ">
        <div className="absolute inset-0 items-center z-10 mt-10 flex justify-center">
          <HomeSearchBar/>
          < NoSSR  />
        </div>
        </div>

     
  );
};

export default Search;
