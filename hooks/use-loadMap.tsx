import { useEffect, useState } from "react";

import isGoogleApiKeyLoaded from "@/hooks/google-api-loader";
import { useLoadScript } from "@react-google-maps/api";

export const useLoadMap = () => {
    // const [mounted, setMounted] = useState(false);
    var result = false;

    // useEffect(() => {
    //     setMounted(true);
    // }, []);

    // if (!mounted) {
    //     return '';
    // }

    if (typeof window !== 'undefined') {
        if (!isGoogleApiKeyLoaded()) {
            useLoadScript({
                googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
                libraries: ['places', 'geometry','geocoding']
            });
            result = true;
            console.log("apikey loaded");
        }
    
        else {
            result = false;
            console.log("apikey already loaded");
        }
    
    }

    return result;
};