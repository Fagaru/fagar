import { Corporation } from "@/types/corporation";
import NoResults from "@/components/ui/no-results";
import CarouselSpacing from "@/components/displayCorp";
import React from "react";
import getCorporations from "@/services/getCorporations"
import CorpoCard from "@/components/corpoCard"


const CorpoList = async({query}:{query:string})=>{
    const corporations = await getCorporations({});
    const filteredCorporations=Array.isArray(corporations)?corporations.filter((corpo)=>{
        // console.log("test taggggggggggggggggg",corpo.tags)
        return corpo.name.toLowerCase().includes(query.toLowerCase());
    }):[];


//    return corpo.tags.some(tag => tag?.label?.toLowerCase().includes(query.toLowerCase()));
    return(
        <div className="space-y-4">
            {corporations.length === 0 && <NoResults/>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {Array.isArray(corporations)&& filteredCorporations.map((corporation) => (
          <React.Fragment key={corporation._id}>
            <CorpoCard key={corporation._id} Corpo={corporation} />;
          </React.Fragment>
    
        ))}

            </div>
        </div>
    );
}


export default CorpoList