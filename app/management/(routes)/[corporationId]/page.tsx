import { CorporationForm } from "./components/corporation-form";
import getCorporation from "@/services/getCorporation";
import getCategories from "@/services/getCategories";


interface ManagementPageProps {
    params: {corporationId: string}
};

const ManagementPage: React.FC<ManagementPageProps> = async({
    params
}) => {
    const corporation = await getCorporation({
        corporationId: params.corporationId
    });
    const categories = await getCategories()
    return (
        <div className="items-center">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CorporationForm initialData={corporation} categories={categories} />
            </div>
        </div>
    );
}

export default ManagementPage;