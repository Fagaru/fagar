import { Tag } from '@/types/tag';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/tags`;


const getTags = async (): Promise<Tag[]> => {
  try {
    const res = await fetch(URL);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching Citys:", error);
    throw error;
  }
};

export default getTags;