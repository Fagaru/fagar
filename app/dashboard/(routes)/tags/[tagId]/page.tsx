import getTag from "@/services/getTag";
import { TagForm } from "./components/tag-form";

const TagPage = async ({
    params
}: {
    params: {tagId: string}
}) => {
    let tag = null;
    if (params.tagId !== "new") {
        tag = await getTag({
            tagId: params.tagId
        });
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <TagForm initialData={tag}/>
            </div>
        </div>
    );
}

export default TagPage;