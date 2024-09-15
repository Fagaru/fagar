import qs from "query-string";

import { City } from '@/types/city';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/cities`;

interface Query {
  cityId?: string
  label ?:string,
}

const getCities = async (query: Query): Promise<City[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        cityId: query.cityId,
        label:query.label,
      }
    })
    const res = await fetch(url);
    
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