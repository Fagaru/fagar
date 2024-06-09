import qs from "query-string";

import { Category } from '@/types/category';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

interface Query {
  categoryId?: string
}

const getCategories = async (query: Query): Promise<Category[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        categoryId: query.categoryId
      }
    })
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // const data: Category[] = await res.json();
    return res.json();
  } catch (error) {
    console.error("Error fetching categorys:", error);
    throw error;
  }
};

export default getCategories;