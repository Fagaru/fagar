"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

import {Category } from "@/types/category";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardFooter} from "@/components/ui/card"
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
            <h3 className="text-lg font-semibold">
              {name}  
            </h3>
            <Carousel className="w-full max-w-xxl">
                
            <CarouselContent className="-ml-1">
                {data.map((filter) => (

                    <CarouselItem  key={filter._id}   className="pl-1   md:basis-1/2 lg:basis-1/10">
                    <Card className={cn(
                                "rounded-md text-xl text-center text-gray-800 p-2 h-10 bg-white border border-gray-300 group cursor-pointer",
                                selectedValue === filter._id && "bg-black text-white"
                            )}
                            onClick={() => onClick(filter._id)}  >
                                <CardContent>
                      
                            {filter.label}
                            </CardContent>
            
                        </Card>
                    {/* </div> */}
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


