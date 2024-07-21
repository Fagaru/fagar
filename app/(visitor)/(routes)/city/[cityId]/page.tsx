import getCity from '@/services/getCity';


import Slider from "./components/carrousel";


import PubSlider from "./components/pub"
import getCorporations from '@/services/getCorporations';
import CarouselSpacing from "./components/displayCorp";
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
        // cityId: params.cityId,
        categoryId: searchParams.categoryId
    })
   
    // console.log(Corporations)
    

    const categories= await getCategories ()

    return (
        <div className='xl'>
            <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-1 gap-2 auto-rows-[minmax(50px,auto)]">
                <div className=" relative row-span-1 col-span-12  rounded-[10px] border-solid border-[1px] shadow-md">
                    <Slider 
                    data={city}
                    />
                </div>
                <div className="relative  row-span-2 col-span-12   md:h-20 rounded-[10px] border-solid border-[1px] md:mx-12 shadow-md">
                    <Filter 
                        valueKey="categoryId"
                        name="Categories"
                        data={categories}
                    />
                </div>
                <div className="relative col-span-12  row-span-2 "> 
                    <CarouselSpacing Corpo={Corporations}/>
                </div>
                <div className="relative col-span-12 row-span-2  ">
                <h3 className="font-bold text-3xl text-center">La star du jour </h3>
                    <PubSlider corporations={Corporations[0]}/>
                </div>
                <div className="relative col-span-12 row-span-2"> 
                    <CarouselSpacing Corpo={Corporations}/>
                </div>
                {/* <div className="relative col-span-3  row-span-2 col-start-2 shadow-md"></div> */}
                <div className="relative col-span-12  row-span-2 "> 
                    <CarouselSpacing Corpo={Corporations}/>
                </div>
            </div>
        </div>             
    );
}

export default CityPage;