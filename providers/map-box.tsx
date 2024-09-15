"use client";

import React from "react";
import { useState, useEffect } from "react";
import GooglePlacesAutocomplete ,{ geocodeByAddress }from 'react-google-places-autocomplete';
import { useRouter} from "next/navigation";
import getCities from '@/services/getCities';
import { cn } from "@/lib/utils";
import { Search} from 'lucide-react';

import { 
    LocateFixed, 
} from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import useLocation from "@/hooks/use-location";
import GoGetMyPosition from "@/hooks/get-my-position";
import { toast } from "react-hot-toast";


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
    const [open, setOpen] = useState(false);
    const placeholder:string = "Entrer votre adresse de livraison";
    const [updateValue] = GoGetMyPosition();
    const address = useLocation();
    const router = useRouter();
  
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
    const [city, setCity] = useState(():string =>{
        if (typeof window !== 'undefined'){
          const from_localStorage = window.localStorage.getItem('user_selected_city')
          if (from_localStorage === null || from_localStorage === undefined){
            return ''
          }
    
          return `${from_localStorage}` ? from_localStorage :''
        }
        return ''
      });

    useEffect(()=>{
        window.localStorage.setItem('user_selected_city', city)
      },[city])

    const handleAddressChange = async (place:any) => {

        const value=place?.label
        try {
          const results = await geocodeByAddress(value);
          const addressComponents = results[0].address_components;
    
          let city = '';
          for (const component of addressComponents) {
            if (component.types.includes('locality')) {
              city = component.long_name;
              break;
            }
          }
    
          setCity(city);
          handleSearch(city)
        } catch (error) {
          console.error('Error fetching address details:', error);
        }
      };

      const handleSearch = async (city:any) => {
   
        if(!city){
        toast.error("Veuillez saisir une addresse!");
        }
        else{
          try {
            const response = await getCities({
              label: city
            });
            router.push(`/city/${response[0]._id}`);
          } catch (err) {
              toast.error("nous ne sommes pas encore disponible dans cette ville!");
          }
        }
       
      };
    
    
    return  (
        // <div className="m-1 ">
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
                                onChange:(place:any)=> {{setnewAddress(place)};{handleAddressChange(place)}},
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
                    {/* <Button className="bg-white p-0 m-1" onClick={() => handleSearch(city)}>
                          <Search className="dark:text-black m-2 h-3 w-8"/>
                    </Button> */}
                </PopoverContent>
            </Popover>
        // </div>
    )
};