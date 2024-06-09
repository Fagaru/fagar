import { format } from "date-fns";

import { TagClient } from "./components/client";
import { Tag } from '@/types/tag';
import getTags from "@/services/getTags";

const TagsPage = async () => {
    const tags = await getTags();

    const formattedTags = tags

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <TagClient data={formattedTags}/>
            </div>
        </div>
    );
}

export default TagsPage;