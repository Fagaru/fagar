"use client";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import {Corporation as CorporationType} from "@/types/corporation";
import { useRouter } from "next/navigation";
import Schedulas from './schedule';
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ReviewSection } from '@/components/reviewSection';



interface DisplayProps{
  Corpo: CorporationType[]
  Category: string
};
const CarouselSpacing: React.FC <DisplayProps> = ({Corpo,Category})=> {

  const router = useRouter();
  const [activeCorpo, setActiveCorpo] = useState(0);
  // const images = data?.images || [];
  const corporations = Corpo.length > 0 ? Corpo : [];
  const clickNext = () => {
    activeCorpo === corporations.length - 1
      ? setActiveCorpo(0)
      : setActiveCorpo(activeCorpo + 1);
  };
  const clickPrev = () => {
    activeCorpo === 0
      ? setActiveCorpo(corporations.length - 1)
      : setActiveCorpo(activeCorpo - 1);
  };
  const handleClick = (corporationId:string) => {
        // router.push(`/category/${category.id}/product/${product.id}`, `/product/${product.id}`)}>
   
          router.push(`/pros/${corporationId}`);
      };
  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold gap-30 tracking-tight">{Category}</h1>
          <div className="flex space-x-4">
          </div>
        </div>
        <Carousel className="w-full max-w-xxl shadow-md">
        <div><CarouselPrevious />
        <CarouselNext /></div>
        
        {/* <div className="grid md:grid-cols-4 gap-4 lg:gap-6 xl:gap-8 items-start mt-8"> */}
        <CarouselContent className="-ml-1">
        {Corpo.map((corporation)=> (
          <CarouselItem  key={corporation._id}   className="pl-1    md:basis-1/2 lg:basis-1/4">
          <Card onClick={() => handleClick(corporation._id)}   style={{
          backgroundImage: `url(${corporation?.images?.[0]?.url || "/default_image.jpg"})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} className="relative pl-1 h-40 group cursor-pointer"  >
            <CardHeader>
            <div className="absolute top-0 right-0 p-0">
                      <Schedulas Corpo={corporation} />
                    </div>
            </CardHeader>
           
          </Card>

            <p className="text-sm">{corporation.name}</p>
            <div className="">
                                    {/* <ReviewSection stars={4} rating_mode="read-only" /> */}
            </div>
          
          </CarouselItem>
        ))}
        </CarouselContent>
        {/* </div> */}
        </Carousel>
      </div>
    </section>
  )
}
export default CarouselSpacing;



