"use client";

import MapBox from "./map-box";
import isGoogleApiKeyLoaded from "@/hooks/google-api-loader";
import { useLoadScript } from "@react-google-maps/api";



interface MapBoxApiKeyWrapperProps {}

export default function MapBoxApiKeyWrapper(props:MapBoxApiKeyWrapperProps) {

    if (typeof window !== 'undefined') {
        if (!isGoogleApiKeyLoaded()) {
            useLoadScript({
                googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
                libraries:  ['places', 'geometry','geocoding']
            });
            console.log("apikey loaded");
        }
    
        else {
            console.log("apikey already loaded");
        }
    
        return  (
        <MapBox/>
        
    )
    }
    
    
};




