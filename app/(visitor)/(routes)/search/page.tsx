import Container from "@/components/ui/container";
import { Suspense } from "react";
import SkeletonDemo from "@/components/skeletonDemo";
import getCorporations from '@/services/getCorporations';
import { Corporation } from "@/types/corporation";
import NoResults from "@/components/ui/no-results";
import CarouselSpacing from "@/components/displayCorp";
import React from "react";
import CorpoCard from "@/components/corpoCard"


export const revalidate = 0;

interface SearchProductsParams {
    searchParams: {
    query?: string;
  }
}
const SearchPage : React.FC<SearchProductsParams> = async({searchParams}) => {
    const query = searchParams?.query ||'';
    const corporations = await getCorporations({});
    const filteredCorporations=Array.isArray(corporations)?corporations.filter((corpo)=>{
        // console.log("test taggggggggggggggggg",corpo.tags)
        // return corpo.tags.some(tag => tag?.label?.toLowerCase().includes(query.toLowerCase()));
        return corpo.name.toLowerCase().includes(query.toLowerCase()) || corpo.tags.some(tag => tag?.label?.toLowerCase().includes(query.toLowerCase()));
    }):[];


//    

    console.log("bigggggggggggggg Querry",query)
    return(
        <Container>
            <div className="space-yt-10 pb-10">
                {/* <Billboard data={billboard}/> */}
                <div className="bg-zinc-900 text-zinc-200">
                   
                    </div>
              
                <div className="flex flex-col gap-y-B px-4 sm:px-6 lg:px-8">
                <Suspense fallback={<SkeletonDemo/>}>
                <div className="space-y-4">
                {corporations.length === 0 && <NoResults/>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                    {Array.isArray(corporations)&& filteredCorporations.map((corporation) => (
                <React.Fragment key={corporation._id}>
                    <CorpoCard key={corporation._id} Corpo={corporation} />
                </React.Fragment>
            
                ))}
                    </div>
                </div>
                </Suspense>
                </div>
            </div>
        </Container>
        
    );  
}
export default SearchPage;