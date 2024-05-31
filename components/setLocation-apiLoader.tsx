"use client"

import { LoadScript } from "@react-google-maps/api";
import isGoogleApiKeyLoaded from "@/hooks/google-api-loader";
import { SetLocation } from "./ui/setLocation";

export interface SetLocationApiKeyWrapperProps {
  setNewAddress: (place: any) => void;
}

export default function SetLocationApiKeyWrapper(props: SetLocationApiKeyWrapperProps) {
  if (typeof window !== 'undefined' && !isGoogleApiKeyLoaded()) {
    return (
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string} libraries={['places', 'geometry', 'geocoding']}>
        <SetLocation setNewAddress={props.setNewAddress} />
      </LoadScript>
    );
  }

  return null;
}