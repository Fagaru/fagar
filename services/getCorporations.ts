import qs from "query-string";

import { Corporation } from '@/types/corporation';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/corporations`;

interface Query {
  categoryId?: string;
  tags?: string;
  cityId?: string;
  regionId?: string;
}

const getCorporations = async (query: Query): Promise<Corporation[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
          categoryId: query.categoryId,
          tags: query.tags,
          cityId: query.cityId,
          regionId: query.regionId
      }
    })
    const res = await fetch(url, {
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

    // const data: Corporation[] = await res.json();
    return res.json();
  } catch (error) {
    console.error("Error fetching corporations:", error);
    throw error;
  }
};

export default getCorporations;