"use client";

import * as React from "react"
import Image from "next/image";
import {Corporation as CorporationType} from "@/types/corporation";
import { useRouter } from "next/navigation";
import Schedulas from './schedule';

import { Card, CardContent, CardHeader, CardTitle, CardFooter} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"



interface DisplayProps{
        Corpo: CorporationType[]
      };
const CarouselSpacing: React.FC <DisplayProps> = ({Corpo})=> {
    const taille = Corpo.length;
const router = useRouter();
const handleClick = (corporationId:string) => {
        // router.push(`/category/${category.id}/product/${product.id}`, `/product/${product.id}`)}>
   
          router.push(`/pros/${corporationId}`);
      };
  return (
    <div>
    <h3 className="font-bold text-3xl">Commerces éco-responsables</h3>
    
    
    <Carousel className="w-full max-w-xxl">
      <CarouselContent className="-ml-1">
            {Corpo.map((corporation)=> (
            
           
          <CarouselItem  key={corporation._id}   className="pl-1   md:basis-1/2 lg:basis-1/4">
            
            <div className="p-1">
            
            <Card  onClick={() => handleClick(corporation._id)} className="group cursor-pointer"  >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{corporation.name}</CardTitle>
               <Schedulas Corpo={corporation}/>
              </div>
            </CardHeader>
                
                <CardContent>
                

                <Image 
                src={corporation?.images?.[0]?.url|| "/default_image.jpg"} 
                width={400}
                height={400} 
                alt="Image" 
                className="w-full h-64 object-cover" />
             
                
                      
                  
                </CardContent>
                 
              </Card>
           
             
            </div>
            
          </CarouselItem>
        
        ))}
      </CarouselContent>
      
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    
    </div>
  )
}
export default CarouselSpacing;



