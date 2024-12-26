import qs from "query-string";

import { Category } from "@/types/category";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories/`;

interface Query {
  categoryId: string
}

const getCategory = async (query: Query): Promise<Category> => {
  try {
    const url = URL+query.categoryId;
    console.log("URL Service ", url);
    const res = await fetch(url, {
      method: 'GET'
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching Category:", error);
    throw error;
  }
};

export default getCategory;