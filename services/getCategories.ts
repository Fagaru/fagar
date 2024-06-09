import qs from "query-string";

import { Category } from '@/types/category';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(URL);
    
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