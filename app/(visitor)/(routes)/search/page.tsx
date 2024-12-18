import Container from "@/components/ui/container";
import SearchProductList from "../../../../components/search-corpolist";
import { Suspense } from "react";
import SkeletonDemo from "@/components/skeletonDemo";
import CorpoList from "@/components/search-corpolist"

export const revalidate = 0;

interface SearchProductsParams {
    searchParams: {
    query?: string;
  }
}
const SearchPage : React.FC<SearchProductsParams> = async({searchParams}) => {
    const query = searchParams?.query ||''

    console.log("bigggggggggggggg Querry",query)
    return(
        <Container>
            <div className="space-yt-10 pb-10">
                {/* <Billboard data={billboard}/> */}
                <div className="mt-20 bg-gray-200 rounded-md text-center py-16 mb-8">
          <h1 className="text-4xl font-bold">Fagar inc</h1>
        </div>
              
                <div className="flex flex-col gap-y-B px-4 sm:px-6 lg:px-8">
                <Suspense fallback={<SkeletonDemo/>}>
                <CorpoList query={query}/>
                </Suspense>
                </div>
            </div>
        </Container>
        
    );  
}
export default SearchPage;