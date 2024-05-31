"use client";

import { useEffect, useState } from "react";


export const GoogleApiProvider = () => {
    const [scriptLoaded, setScriptLoaded] = useState(false);
    // const [isMounted, setIsMounted] = useState(false);

    // useEffect(() => {
    //     setIsMounted(true);
    // }, []);

    // if (!isMounted) {
    //     return null;
    // }

    useEffect(() => {
        const loadGooglePlacesAPI = async () => {
          try {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}&libraries=places`;
            script.defer = true;
            script.async = true;
    
            script.onload = () => {
              setScriptLoaded(true);
              console.log('Google Places Autocomplete API loaded successfully.');
            };
    
            script.onerror = () => {
              console.error('Failed to load Google Places Autocomplete API.');
            };
    
            document.head.appendChild(script);
          } catch (error) {
            console.error('Error loading Google Places Autocomplete API:', error);
          }
        };
    
        loadGooglePlacesAPI();
      }, []); // Run the effect only once when the component mounts

      if (!scriptLoaded) {
        return <div>Loading...</div>; // Add a loading indicator while the script is loading
      }

      return <></>
}