import { format } from "date-fns";

import { CategoryClient } from "./components/client";
import { Category } from '@/types/category';
import getCategories from "@/services/getCategories";

const CategoriesPage = async () => {
    const categories = await getCategories();

    // const formattedCategories = categories.map((item: Category) => ({
    //     id: item._id,
    //     label: item.label,
    //     createdAt: format(item.createdAt, "MMMM do, yyyy")
    // }));

    const formattedCategories = categories

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data={formattedCategories}/>
            </div>
        </div>
    );
}

export default CategoriesPage;