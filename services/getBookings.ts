import qs from "query-string";

import { Booking } from '@/types/booking';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/bookings`;

interface Query {
  categoryId?: string;
  status?: string;
  corporationId: string;
  userId?: string;
  date?: string;
}

const getBookings = async (query: Query): Promise<Booking[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
          corporationId: query.corporationId,
          categoryId: query.categoryId,
          userId: query.userId,
          status: query.status,
          date: query.date
      }
    })
    const res = await fetch(url, {
      method: 'GET'
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // const data: Corporation[] = await res.json();
    return res.json();
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

export default getBookings;