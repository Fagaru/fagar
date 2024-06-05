import { format } from "date-fns";

import { RegionClient } from "./components/client";
import getRegions from "@/services/getRegions";

const RegionsPage = async () => {
    const regions = await getRegions({});

    const formattedRegions = regions

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <RegionClient data={formattedRegions}/>
            </div>
        </div>
    );
}

export default RegionsPage;