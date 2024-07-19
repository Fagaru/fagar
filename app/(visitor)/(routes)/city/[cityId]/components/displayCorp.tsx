"use client";

// import * as React from "react"
// import Image from "next/image";
// import {Corporation as CorporationType} from "@/types/corporation";
// import { useRouter } from "next/navigation";
// import Schedulas from './schedule';

// import { Card, CardContent, CardHeader, CardTitle, CardFooter} from "@/components/ui/card"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"



// interface DisplayProps{
//         Corpo: CorporationType[]
//       };
// const CarouselSpacing: React.FC <DisplayProps> = ({Corpo})=> {
//     const taille = Corpo.length;
// const router = useRouter();
// const handleClick = (corporationId:string) => {
//         // router.push(`/category/${category.id}/product/${product.id}`, `/product/${product.id}`)}>
   
//           router.push(`/pros/${corporationId}`);
//       };
//   return (
//     <div>
//     <h3 className="font-bold text-3xl">Commerces éco-responsables</h3>
    
    
//     <Carousel className="w-full max-w-xxl">
//       <CarouselContent className="-ml-1">
//             {Corpo.map((corporation)=> (
            
           
//           <CarouselItem  key={corporation._id}   className="pl-1   md:basis-1/2 lg:basis-1/4">
            
//             <div className="p-1">
            
//             <Card  onClick={() => handleClick(corporation._id)} className="group cursor-pointer "  >
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle>{corporation.name}</CardTitle>
//                <Schedulas Corpo={corporation}/>
//               </div>
//             </CardHeader>
                
//                 <CardContent>
                

//                 <Image 
//                 src={corporation?.images?.[0]?.url|| "/default_image.jpg"} 
//                 width={400}
//                 height={100} 
//                 alt="Image" 
//                 className="w-full h-64 object-cover" />
             
                
                      
                  
//                 </CardContent>
                 
//               </Card>
           
             
//             </div>
            
//           </CarouselItem>
        
//         ))}
//       </CarouselContent>
      
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
    
//     </div>
//   )
// }
// export default CarouselSpacing;






/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lZf7PrNz6Px
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import * as React from "react"
import Image from "next/image";
import {Corporation as CorporationType} from "@/types/corporation";
import { useRouter } from "next/navigation";
import Schedulas from './schedule';
import { useEffect, useState } from "react";
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
          <h1 className="text-2xl font-bold gap-30 tracking-tight">Featured Products</h1>
          <div className="flex space-x-4">
            {/* <Button size="icon">
              <ArrowLeftIcon className="w-6 h-6" />
            </Button>
            
            <Button size="icon">
              <ArrowRightIcon className="w-6 h-6" />
            </Button> */}
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
        }} className="pl-1 h-40 group cursor-pointer"  >
            <CardHeader>
            <div className="relative bottom-5 left-60">
      <Schedulas Corpo={corporation} />
    </div>
            </CardHeader>
           
          </Card>

            <p className="text-sm">{corporation.name}</p>
          
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

// function ArrowLeftIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m12 19-7-7 7-7" />
//       <path d="M19 12H5" />
//     </svg>
//   )
// }


// function ArrowRightIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M5 12h14" />
//       <path d="m12 5 7 7-7 7" />
//     </svg>
//   )
// }


// function XIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   )
// }



