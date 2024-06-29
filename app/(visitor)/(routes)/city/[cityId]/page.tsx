import Container from '@/components/ui/container';
import { format } from "date-fns";
import getCity from '@/services/getCity';
// import { CityClient } from ".@/components/client";
import { City } from '@/types/city';
import getCities from "@/services/getCities";
import Slider from "./components/carrousel";
import Image from "next/image";
import {Corporation as CorporationType} from "@/types/corporation";

import restaurant from "@/public/restaurant.svg"
import location from "@/public/location.svg"
import medical from "@/public/medical.svg"
import boulangerie from "@/public/boulangerie.svg"
import divertissement from "@/public/divertissement.svg"
import  taxi from "@/public/taxi.svg"
import bar from "@/public/bar.svg"
import garage from "@/public/garage.svg"
import agriculteur from"@/public/agricultur.svg"
import essence from "@/public/essence.svg"
import PubSlider from "./components/pub"
import getCorporations from '@/services/getCorporations';
import CarouselSpacing from "./components/displayCorp";
import Schedulas from './components/schedule';
// import CategoryCard from './components/categories'
import getCategories from "@/services/getCategories"
import Filter from "./components/categoryFilter";

interface CityPageProps {
    params: {
        cityId: string;
    }
    searchParams: {
        categoryId: string;
      
    }
}

const CityPage:React.FC<CityPageProps> = async ({
    params,
    searchParams
}) => {
    const city = await getCity(params)
    const Corporations = await getCorporations({
        cityId: params.cityId,
        categoryId: searchParams.categoryId
    })
    // console.log("Corporationssssss",Corporations)
   
    // console.log(Corporations)
    

const categories= await getCategories ({})

    return (
      
<div className='m-6'>



<div className=" relative grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-1 gap-8 px-12 auto-rows-[minmax(50px,auto)]">
                        <div className=" relative row-span-2 col-span-12 rounded-[10px] border-solid border-[1px]">
                            {/* <ImagesGallery images={corporation.images[0]} /> */}
                            <Slider 
                            data={city}
                            />
                        </div>
                    

        
{/* <div className="grid sm:grid-cols-12 lg:grid-cols-4 md:grid-cols-1 gap-4 p-12 auto-rows-[minmax(180px,auto)] relative"> */}
{/* <div className="grid grid-rows-3 grid-flow-col gap-4"> */}
    <div className="relative  hidden lg:block col-span-12 row-span-1 col-start-2 col-end-5 h-20 rounded-[10px] border-solid border-[1px] shadow-md">
                            <Filter 
                            valueKey="categoryId"
                            name="Categories"
                            data={categories }
                            />

              {/* <Image src={medical} alt="" /> */}
    </div>
    <div className="relative col-span-3  row-span-2 col-start-2 shadow-md"> 
    
    <CarouselSpacing Corpo={Corporations}/>
    </div>
    <div className="relative col-span-3 row-span-2 col-start-2 shadow-md ">
      <PubSlider corporations={Corporations[0]}/>
    </div>
    {/* <div className="col-span-3 row-span-3 col-start-1 row-start-7 bg-white">5</div>
    <div className="col-span-12 col-start-1 row-start-10 bg-white">6</div> */}
    {/* <div className="col-span-3 row-span-2 col-start-10 row-start-2 bg-white">7</div> */}
    
    <div className="relative col-span-3  row-span-2 col-start-2 shadow-md"> 
    <CarouselSpacing Corpo={Corporations}/>
    
    </div>
    <div className="relative col-span-3  row-span-2 col-start-2 shadow-md"> 
    <CarouselSpacing Corpo={Corporations}/>
    {/* <Schedulas corporations={Corporations}/> */}
    </div>
    
    
    {/* <div className="col-span-3 row-span-2 col-start-10 row-start-4 bg-white">8</div>
    <div className="col-span-3 row-span-4 col-start-10 row-start-6 bg-white">9</div>
    <div className="col-span-6 row-span-8 text-white col-start-4 row-start-2 bg-white" >10</div> */}
{/* </div>  */}

</div>
        </div>
        
    );
}

export default CityPage;
