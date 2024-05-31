"use client"

import { useState } from "react";

interface WindowWithGoogle extends Window {
    google?: any;
  }
  
export default function isGoogleApiKeyLoaded(): any {
    //const [result,setResult] = useState<boolean>(false);

    if (typeof window !== 'undefined') {
        const windowWithGoogle: WindowWithGoogle = window;
        //setResult(windowWithGoogle.google)
        console.log(!!windowWithGoogle.google);
        return !!windowWithGoogle.google
    }
    
    //return !!result;
}

