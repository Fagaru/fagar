import qs from "query-string";

import { User } from '@/types/user';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/users/`;

interface Query {
  userId: string
}

const getUser = async (query: Query): Promise<User> => {
  try {
    const url = URL+query.userId;
    console.log("URL Service ", url);
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching User:", error);
    throw error;
  }
};

export default getUser;