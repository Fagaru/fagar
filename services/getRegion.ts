import qs from "query-string";

import { Region } from '@/types/region';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/regions/`;

interface Query {
  regionId: string
}

const getRegion = async (query: Query): Promise<Region> => {
  try {
    const url = URL+query.regionId;
    console.log("URL Service ", url);
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching Region:", error);
    throw error;
  }
};

export default getRegion;