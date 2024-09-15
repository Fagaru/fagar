import qs from "query-string";

import { City } from '@/types/city';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/cities/`;

interface Query {
  cityId: string,
}

const getCity = async (query: Query): Promise<City> => {
  try {
    const url = URL+query.cityId;
    console.log("URL Service ", url);
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching City:", error);
    throw error;
  }
};

export default getCity;