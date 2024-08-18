import { Subscription } from '@/types/subscription';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/subscriptions`;

const getSubscriptions = async (): Promise<Subscription[]> => {
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

    return res.json();
  } catch (error) {
    console.error("Error fetching Subscriptions:", error);
    throw error;
  }
};

export default getSubscriptions;