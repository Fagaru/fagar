import getCity from '@/services/getCity';


import Slider from "./components/carrousel";


import PubSlider from "./components/pub"
import getCorporations from '@/services/getCorporations';
import CarouselSpacing from "@/components/displayCorp";
import getCategories from "@/services/getCategories"
import Filter from "./components/categoryFilter";

interface CityPageProps {
    params: Promise<{ cityId?: string }>;
    searchParams: Promise<{
        categoryId?: string;
    }>
}

const CityPage:React.FC<CityPageProps> = async ({
    params,
    searchParams
}) => {
    const city = await getCity(await params)
    const Corporations = await getCorporations(await searchParams)
   
    const categories= await getCategories ()

    console.log("CATEEEEEEEEEEEEEEEEEEE",Corporations)
 
    const sportCorpos = Corporations.filter(corporation => corporation.categoryId === '66603b301052c74d3fa95557');
    const sportCateg=categories.filter(category=>category._id ==='66603b301052c74d3fa95557')

    return (
        <div className='m-6'>
            {/* <div className="relative grid xl:grid-cols-4  md:grid-cols-1 gap-2 auto-rows-[minmax(50px,auto)]"> */}
                <div className=" relative row-span-1 col-span-12 p-2  mn-4 rounded-[10px] border-solid border-[1px] shadow-md">
                    <Slider 
                    data={city}
                    />
                </div>
                <div className="row-span-2 col-span-12  gap-2 md:h-20 rounded-[10px] border-solid border-[1px] md:mx-12 shadow-md mt-4">
                    <Filter 
                        valueKey="categoryId"
                        name="Categories"
                        data={categories}
                    />
                </div>
                <div className="relative col-span-12  row-span-2 "> 
                    <CarouselSpacing Corpo={Corporations} Category='Featured products'/>
                </div>
                <div className="relative col-span-12 row-span-2  ">
                <h3 className="font-bold text-3xl text-center">La star du jour </h3>
                    <PubSlider corporations={Corporations[0]}/>
                </div>
                <div className="relative col-span-12 row-span-2"> 
                    <CarouselSpacing Corpo={Corporations} Category='Featured products'/>
                </div>
                {/* <div className="relative col-span-3  row-span-2 col-start-2 shadow-md"></div> */}
                <div className="relative col-span-12  row-span-2 "> 
                    <CarouselSpacing Corpo={Corporations} Category='Featured products'/>
                </div>

                <div className="relative col-span-12  row-span-2 "> 
                    <CarouselSpacing Corpo={sportCorpos} Category={sportCateg[0].label} />
                </div>
            </div>
        // </div>             
    );
}

export default CityPage;