import { Corporation } from '@/types/corporation';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/corporations/`;

interface Query {
  corporationId?: string
}

const getCorporation = async (query: Query): Promise<Corporation> => {
  try {
    const url = URL+query.corporationId;
    console.log("URL Service ", url);
    const res = await fetch(url, {
      method: 'GET'
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching Corporation:", error);
    throw error;
  }
};

export default getCorporation;