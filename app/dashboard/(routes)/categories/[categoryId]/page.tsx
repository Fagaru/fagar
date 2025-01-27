import { CategoryForm } from "./components/category-form";
import getCategory from "@/services/getCategory";

const CategoryPage = async ({
    params
}: {
    params: Promise<{categoryId: string}>
}) => {
    let category = null

    if ((await params).categoryId !== "new") {
        category = await getCategory({
            categoryId: (await params).categoryId
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