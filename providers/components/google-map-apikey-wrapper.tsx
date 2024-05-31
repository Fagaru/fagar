"use client"

import { LoadScript } from "@react-google-maps/api";
import GoogleMapSection from "./google-map";
import isGoogleApiKeyLoaded from "@/hooks/google-api-loader";
import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { Loader, LoaderIcon } from "lucide-react";

interface GoogleMapSecionApiKeyWrapperProps {}

export default function GoogleMapSecionApiKeyWrapper(props:GoogleMapSecionApiKeyWrapperProps) {
    if (typeof window !== 'undefined') {
        if (!isGoogleApiKeyLoaded()) {
            useLoadScript({
                googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
                libraries: ['places', 'geometry','geocoding']
            });
            console.log("apikey loaded");
        }
    
        else {
            console.log("apikey already loaded");
        }
    
        return <GoogleMapSection/>//<LoaderIcon/>
    }

} 
    





