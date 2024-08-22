import qs from "query-string";

import { Corporation } from "@/types/corporation";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/corporations`;

interface Query{
    name?: string;

}
const searchProduct = async (query: Query): Promise<Corporation[]> => {
    console.log("[QUERY]", query);
    const url = qs.stringifyUrl({
        url: `${URL}/search`,
        query:{
            name: query.name,
            // sizeId: query.sizeId,
            // categoryId: query.categoryId,
            // isFeatured: query.isFeatured,
        },
    });
    console.log("[URL]", url);
    const res = await fetch(url, {
      method: 'GET'
    });

    return res.json();
};

export default searchProduct;