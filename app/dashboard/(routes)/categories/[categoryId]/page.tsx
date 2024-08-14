import { CategoryForm } from "./components/category-form";
import getCategory from "@/services/getCategory";

const CategoryPage = async ({
    params
}: {
    params: {categoryId: string}
}) => {
    let category = null

    if (params.categoryId !== "new") {
        category = await getCategory({
            categoryId: params.categoryId
        });
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-10 pt-8">
                <CategoryForm initialData={category}/>
            </div>
        </div>
    );
}

export default CategoryPage;