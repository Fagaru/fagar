import { Subscription } from '@/types/subscription';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/subscriptions`;

const getSubscriptions = async (): Promise<Subscription[]> => {
  try {
    const res = await fetch(URL, {
      method: 'GET'
    });
    
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