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
        <div className='m-6'>
            <div className=" relative grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-1 gap-8 px-12 auto-rows-[minmax(50px,auto)]">
                <div className=" relative row-span-2 col-span-12 rounded-[10px] border-solid border-[1px]">
                    <Slider 
                    data={city}
                    />
                </div>
                <div className="relative  hidden lg:block col-span-12 row-span-1 col-start-2 col-end-5 h-20 rounded-[10px] border-solid border-[1px] shadow-md">
                    <Filter 
                        valueKey="categoryId"
                        name="Categories"
                        data={categories}
                    />
                </div>
                <div className="relative col-span-3  row-span-2 col-start-2 shadow-md"> 
                    <CarouselSpacing Corpo={Corporations}/>
                </div>
                <div className="relative col-span-3 row-span-2 col-start-2 shadow-md ">
                    <PubSlider corporations={Corporations[0]}/>
                </div>
                <div className="relative col-span-3  row-span-2 col-start-2 shadow-md"> 
                    <CarouselSpacing Corpo={Corporations}/>
                </div>
                <div className="relative col-span-3  row-span-2 col-start-2 shadow-md"> 
                    <CarouselSpacing Corpo={Corporations}/>
                </div>
            </div>
        </div>             
    );
}

export default CityPage;