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
      method: 'GET'
    });
    
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