import { RegionForm } from "./components/region-form";
import getRegion from "@/services/getRegion";

const RegionPage = async ({
    params
}: {
    params: Promise <{regionId: string}>
}) => {
    let region = null;
    if ((await params).regionId !== "new") {
        region = await getRegion({
            regionId: (await params).regionId
        });
        console.log("initialData REGION :", region);
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