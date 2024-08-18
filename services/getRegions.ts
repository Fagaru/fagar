import qs from "query-string";

import { Region } from '@/types/region';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/regions`;

interface Query {
  regionId?: string
}

const getRegions = async (query: Query): Promise<Region[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
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

    return res.json();
  } catch (error) {
    console.error("Error fetching Regions:", error);
    throw error;
  }
};

export default getRegions;