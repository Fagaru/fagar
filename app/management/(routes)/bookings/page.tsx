"use client";
import { format } from "date-fns";

import { BookingsClient } from "./components/client";
import { Booking } from '@/types/booking';

import { useEffect, useState } from "react";
import getBookings from "@/services/getBookings";
import { ModalBookingProvider } from "@/providers/modal_booking-provider";
import { useSearchParams } from "next/navigation";
import { ModalBookingDurationProvider } from "@/providers/modal_booking_duration-provider";

interface BookingsPageProps {
  params: {corporationId: string}
};

const BookingsPage: React.FC<BookingsPageProps> = ({
  params
}) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const corporationId: any = searchParams.get('corporationId'); // Lire le paramètre 'tab' de l'URL

  console.log("Corporation ID", corporationId);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const fetchData = async () => {
      try {
        const [books] = await Promise.all([
          getBookings({corporationId: corporationId})
        ]);

        setBookings(books);
      } catch (err) {
        setError("Failed to fetch bookings data");
      }
    };

    fetchData();
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("BOOKINGS LISTS", bookings);


  // Format the corporations data
  const formattedCorporations = bookings.map((item) => ({
    _id: item._id,
    user: (item.userId.first_name +" "+ item.userId.last_name) || "Utilisateur inconnu",
    status: item.status,
    date: format(new Date(item.date), 'MMMM do, yyyy'),
    heure_debut: item.timeSlot.split("-")[0],
    heure_fin: item.timeSlot.split("-")[1],
    comment: item.comment,
    createdAt: format(new Date(item.createdAt), 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-16 pt-20">
        <ModalBookingProvider corporationId={corporationId} />
        <ModalBookingDurationProvider corporationId={corporationId} />
        <BookingsClient data={formattedCorporations} />
      </div>
    </div>
  );
};

export default BookingsPage;
