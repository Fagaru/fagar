//"use client"
import { LoadScript } from "@react-google-maps/api";
import MapBox from "./map-box";
import isGoogleApiKeyLoaded from "@/hooks/google-api-loader";
import { useLoadScript } from "@react-google-maps/api";
import { Loader } from "lucide-react";
import { LoaderIcon } from "react-hot-toast";
import { useEffect } from "react";

interface MapBoxApiKeyWrapperProps {}

export default function MapBoxApiKeyWrapper(props:MapBoxApiKeyWrapperProps) {

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
    
        return <MapBox/>//<LoaderIcon/
    }
    
    
};




