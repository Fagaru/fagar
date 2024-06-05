import { Tag } from '@/types/tag';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/tags/`;

interface Query {
  tagId: string
}

const getTag = async (query: Query): Promise<Tag> => {
  try {
    const url = URL+query.tagId;
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

export default getTag;