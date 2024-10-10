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

import { toast } from "react-hot-toast";




interface MapBoxProps {
    className?: string; 
}

const MapBox: React.FC<MapBoxProps> = ({ className }) => { {

    const [open, setOpen] = useState(false);
    const placeholder:string = "Entrer votre adresse de livraison";
    const router = useRouter();
  
    const [city, setCity] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.localStorage.getItem('user_selected_city') || '';
        }
        return '';
    });
    

    useEffect(() => {
        if (city) {
            window.localStorage.setItem('user_selected_city', city);
        }
    }, [city]);

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
    
        }
      };
  

      const handleSearch = async (city:any) => {
   
        if(!city){
        toast.error("Veuillez saisir une ville!");
        }
        else{
          try {
            const response = await getCities({
              label: city
            });
            console.log("fefefeeeee",response)
            router.push(`/city/${response[0]._id}`);
          } catch (err) {
              toast.error("nous ne sommes pas encore disponible dans cette ville!");
          }
        }
       
      };
    
    
    return  (
        <div suppressHydrationWarning={true}>
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
                        
                        {city}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="flex items-center p-0 w-full">
                
                    <GooglePlacesAutocomplete 
                            
                            selectProps={{
                                //newAddress, if problem, unindent
                                onChange:(place:any)=> {{handleAddressChange(place)}},
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
                </PopoverContent>
            </Popover>
        </div>
    )
}
};

export default MapBox;