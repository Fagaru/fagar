"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { Key } from 'lucide-react';

import {Category } from "@/types/category";
import { cn } from "@/lib/utils";
import { Dumbbell } from 'lucide-react';
import { FerrisWheel } from 'lucide-react';
import { HousePlus } from 'lucide-react';
import { HandPlatter } from 'lucide-react';
import { CarTaxiFront } from 'lucide-react';
import { Wrench } from 'lucide-react';
import { Beer } from 'lucide-react';
import { Vegan } from 'lucide-react';


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface FilterProps {
    valueKey: string;
    name: string;
    data: Category[]
    }
const Filter: React.FC<FilterProps> = ({
    valueKey,
    name,
    data
}) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const selectedValue = searchParams.get(valueKey);

    const onClick = (id: string) => {
        const current = qs.parse(searchParams.toString());

        const query = {
            ...current,
            [valueKey]: id
        };

        if (current[valueKey] === id) {
            query[valueKey] = null;
        }

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, { skipNull: true });

        router.push(url);
    }

    return (
        <div className="mb-8">
            {/* <h3 className="text-lg font-semibold">
              {name}  
            </h3> */}
            <Carousel className="w-full max-w-xxl">
                
            <CarouselContent className="-ml-1">
                {data.map((filter) => (

                    <CarouselItem  key={filter._id}   className="pl-1   md:basis-1/6 lg:basis-1/10">
                    {(() => {
                                let icon;

                                switch (filter.label) {
                                case "Sport":
                                icon = <Dumbbell className={cn(
                                    "cursor-pointer","h-14",
                                    selectedValue === filter._id && "bg-gray-300 text-white"
                                )}
                                onClick={() => onClick(filter._id)} />;
                                break;
                                case "Loisirs":
                                icon = <FerrisWheel  className={cn(
                                    "cursor-pointer","h-14",
                                    selectedValue === filter._id && "bg-gray-300 text-white"
                                )}
                                onClick={() => onClick(filter._id)}/>;
                                break;
                                case "Médical":
                                icon= <HousePlus className={cn(
                                    "cursor-pointer","h-14",
                                    selectedValue === filter._id && "bg-gray-300 text-white"
                                )}
                                onClick={() => onClick(filter._id)}/>;
                                break;
                                case "Restauration":
                                icon=<HandPlatter className={cn(
                                    "cursor-pointer","h-14",
                                    selectedValue === filter._id && "bg-gray-300 text-white"
                                )}
                                onClick={() => onClick(filter._id)}/>;
                                break;
                                case "Location":
                                icon=<Key className={cn(
                                    "cursor-pointer","h-14",
                                    selectedValue === filter._id && "bg-gray-300 text-white"
                                )}
                                onClick={() => onClick(filter._id)}/>;
                                break;
                                case "Taxi":
                                icon=<CarTaxiFront className={cn(
                                    "cursor-pointer","h-14",
                                    selectedValue === filter._id && "bg-gray-300 text-white"
                                )}
                                onClick={() => onClick(filter._id)}/>;
                                break;
                                case "Garage":
                                icon=<Wrench className={cn(
                                    "cursor-pointer","h-14",
                                    selectedValue === filter._id && "bg-gray-300 text-white"
                                )}
                                onClick={() => onClick(filter._id)}/>;
                                break;
                                case "Bar":
                                icon=<Beer className={cn(
                                    "cursor-pointer","h-14",
                                    selectedValue === filter._id && "bg-gray-300 text-white"
                                )}
                                onClick={() => onClick(filter._id)}/>;
                                break;
                                case "Fruits&Légumes":
                                icon=<Vegan className={cn(
                                    "cursor-pointer","h-14",
                                    selectedValue === filter._id && "bg-gray-300 text-white"
                                )}
                                onClick={() => onClick(filter._id)}/>;
                                break;
                                default:
                                icon = null;
                         }


                  return (
                    <div className="flex flex-col items-center justify-center">
                    <div className="mb-0">{icon}</div>
                    <div className="text-center">{filter.label}</div>
                  </div>
                  );
                })()}
                    </CarouselItem>
                ))}
            {/* </div> */}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>
        </div>


    );
}

export default Filter;


