import qs from "query-string";

import { Category } from '@/types/category';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(URL, {
      method: 'GET',
      headers: {
        // En-têtes CORS ajoutés à la requête
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json', // S'assure que le Content-Type est JSON
      },
    });;
    
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