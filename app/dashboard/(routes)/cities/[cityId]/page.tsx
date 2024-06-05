import getCity from "@/services/getCity";
import { CityForm } from "./components/city-form";

const CityPage = async ({
    params
}: {
    params: {cityId: string}
}) => {
    let city = null;
    if (params.cityId !== "new") {
        city = await getCity({
            cityId: params.cityId
        });
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CityForm initialData={city}/>
            </div>
        </div>
    );
}

export default CityPage;