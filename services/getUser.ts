import qs from "query-string";

import { User } from '@/types/user';
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/users/`;

interface Query {
  userId: string
}

export const getUser = async (query: Query, token: string): Promise<User> => {
  try {
    const url = `${URL}${query.userId}`;
    console.log("URL Service", url);

    // Configurer les headers avec le token
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    // Retourner les données utilisateur
    return res.data as User;
  } catch (error) {
    console.error("Error fetching User:", error);
    throw error;
  }
};

export const getUser4Admin = async (query: Query, token: string): Promise<User> => {
  try {
    const url = `${URL}${query.userId}/admin`;
    console.log("URL Service", url);

    // Configurer les headers avec le token
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    // Retourner les données utilisateur
    return res.data as User;
  } catch (error) {
    console.error("Error fetching User:", error);
    throw error;
  }
};