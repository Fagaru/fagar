"use client"

import React from "react";
import { useState, useEffect,useRef ,ChangeEvent  } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useLoadScript } from "@react-google-maps/api";

import { cn } from "@/lib/utils";

import { 
    LocateFixed, 
    MapPin
} from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import useLocation from "@/hooks/use-location";
import GoGetMyPosition from "@/hooks/get-my-position";


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface MapBoxProps extends PopoverTriggerProps {
};

export default function MapBox({className

}: MapBoxProps) {

    type newAddress = {
        placeId: string|undefined;
        label: string|undefined;
      };

    const [newAddress, setnewAddress] = useState<newAddress>({
        placeId:"",
        label:"",
    });
    const libraries = ["places"];
    const [open, setOpen] = useState(false);
    const placeholder:string = "Entrer votre adresse de livraison";
    const [updateValue] = GoGetMyPosition();
    const address = useLocation();
    const [input, setInput] = useState({});
    const inputRef = useRef(null);
  
    useEffect(() => {
        if (address?.item[0]?.label === "" || address?.item[0]?.label === null || address?.item[0]?.label === undefined) {
            updateValue();
        }
      }, [address]);

    useEffect(() => {
        if (newAddress?.label!==null && newAddress?.label!=="" && newAddress?.label!==undefined) {
            address.addItem({
                label: newAddress.label,
                placeId: newAddress.placeId,
            })
        }
    }, [newAddress]);



    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        libraries,
      });

      useEffect(() => {
        if (!isLoaded || loadError) return;
    
        const options = {
          componentRestrictions: { country: "ng" },
          fields: ["address_components", "geometry"],
        };
    
        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, options);
        autocomplete.addListener("place_changed", () => handlePlaceChanged(autocomplete));
    
        // return () => autocomplete.removeListener("place_changed", handlePlaceChanged);
      }, [isLoaded, loadError]);
     

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setInput((values) => ({ ...values, [name]: value }));
      };

      const handlePlaceChanged = async(address) => {
        if (!isLoaded) return;
        const place = address.getPlace()
    
        if (!place || !place.geometry) {
          setInput({});
          return;
        }
        formData(place);
      };

    const formData = (data) => {
        const addressComponents = data?.address_components;
    
        const componentMap = {
          subPremise: "",
          premise: "",
          street_number: "",
          route: "",
          country: "",
          postal_code: "",
          administrative_area_level_2: "",
          administrative_area_level_1: "",
        };
    
        for (const component of addressComponents) {
          const componentType = component.types[0];
          if (componentMap.hasOwnProperty(componentType)) {
            componentMap[componentType] = component.long_name;
          }
        }
    
        const formattedAddress =
          `${componentMap.subPremise} ${componentMap.premise} ${componentMap.street_number} ${componentMap.route}`.trim();
        const latitude = data?.geometry?.location?.lat();
        const longitude = data?.geometry?.location?.lng();
    
        setInput((values) => ({
          ...values,
          streetAddress: formattedAddress,
          country: componentMap.country,
          zipCode: componentMap.postal_code,
          city: componentMap.administrative_area_level_2,
          state: componentMap.administrative_area_level_1,
          latitude: latitude,
          longitude: longitude,
        }));
      };
    
    return  (
        isLoaded &&(
        // p-3 rounded-lg m-5 flex items-center gap-2 
        <div className="m-1 ">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select an address"
                        className={cn("max-w-[400px] flex items-center justify-between", className)}
                    >
                        <LocateFixed className="mr-2 h-4 w-8"/>
                        {address?.item[0]?.label}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="flex items-center p-0 w-full">
                    <GooglePlacesAutocomplete 
                            selectProps={{
                                //newAddress, if problem, unindent
                                onChange:(place:any)=> {setnewAddress(place)},
                                placeholder: placeholder ,
                                isClearable: true,
                                className: 'p-1 border-[2px] rounded-lg w-[400px] h-full dark:text-black',
                                components: {
                                    DropdownIndicator: null,
                                },
                                styles: {
                                    control: (provided: any) => ({
                                    ...provided,
                                    backgroundColor: '',
                                    border: 'none',
                                    innerWidth: '500px',
                                    width: '400px',
                                    text: '[30px]',
                                    }),
                                },
                            }}
                            
                    ></GooglePlacesAutocomplete>
                    <Button onClick={() => updateValue()} className="p-0 m-1"><MapPin className="m-2 h-3 w-8"/></Button>
                </PopoverContent>
            </Popover>
        </div>
    ))
};