import { Subscription } from '@/types/subscription';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/subscriptions/`;

interface Query {
  subscriptionId: string
}

const getSubscription = async (query: Query): Promise<Subscription> => {
  try {
    const url = URL+query.subscriptionId;
    console.log("URL Service ", url);
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching Subscription:", error);
    throw error;
  }
};

export default getSubscription;