import { RegionForm } from "./components/region-form";
import getRegion from "@/services/getRegion";

const RegionPage = async ({
    params
}: {
    params: {regionId: string}
}) => {
    let region = null;
    if (params.regionId !== "new") {
        region = await getRegion({
            regionId: params.regionId
        });
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <RegionForm initialData={region}/>
            </div>
        </div>
    );
}

export default RegionPage;