import qs from "query-string";

import { City } from '@/types/city';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/cities`;

interface Query {
  cityId?: string
}

const getCities = async (query: Query): Promise<City[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        cityId: query.cityId
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

    return res.json();
  } catch (error) {
    console.error("Error fetching Citys:", error);
    throw error;
  }
};

export default getCities;