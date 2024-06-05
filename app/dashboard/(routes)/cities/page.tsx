import { format } from "date-fns";

import { CityClient } from "./components/client";
import { City } from '@/types/city';
import getCities from "@/services/getCities";

const CitiesPage = async () => {
    const cities = await getCities({});

    // const formattedCities = cities.map((item: City) => ({
    //     id: item._id,
    //     label: item.label,
    //     createdAt: format(item.createdAt, "MMMM do, yyyy")
    // }));

    const formattedCities = cities

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CityClient data={formattedCities}/>
            </div>
        </div>
    );
}

export default CitiesPage;