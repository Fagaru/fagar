"use client";

import { useEffect, useState } from 'react';
import { useAuth } from "@/context/authContext";
import useAxiosWithAuth from '@/hooks/useAxiosWithAuth';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { Corporation } from '@/types/corporation';
import getCorporation from '@/services/getCorporation';
import { Calendar } from "@/components/ui/calendar";
import { getTimeSlotsForDate } from '@/lib/timeSlot';
import TimeSlotSelector from './timeSlotSelector';
import getBookings from '@/services/getBookings';
import { Button } from './ui/button';

interface BookingProps {
  corporationId: string;
};

const BookingForm: React.FC<BookingProps> = ({ corporationId }) => {
  const { user, isAuthenticated } = useAuth();
  const [corporation, setCorporation] = useState<Corporation | null>(null);
  const [timeSlots, setTimeSlots] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [bookSlots, setBookSlots] = useState<any>(); // Structure pour timeSlot

  const [date, setDate] = useState<any>(new Date())


  const router = useRouter();

  const axios = useAxiosWithAuth();

  useEffect(() => {
    const fetchCorporation = async () => {
        try {
          const [corps, bookings] = await Promise.all([
            await getCorporation({ corporationId: corporationId }),
            await getBookings({ corporationId: corporationId }),
          ]);
          // const data = await getCorporation({
          //     corporationId: corporationId
          // });
          setCorporation(corps);
          setBookSlots(bookings);
        } catch (err) {
            setError("Failed to fetch corporation");
        }
    };

    fetchCorporation();
  }, [corporationId]);

  useEffect(() => {
    try {
        const chosenDate = date; // Date choisie par l'utilisateur
        const durationBooking: any = corporation?.duration_booking;
        const schedules: any = corporation?.schedules;
        const bookedSlots_list: any = bookSlots.map((bookSlot: any) => { return bookSlot.timeSlot});

        const currentTimeSlots = getTimeSlotsForDate(schedules, chosenDate, durationBooking, bookedSlots_list);
        console.log("TIMESLOTS ",currentTimeSlots); // Affiche: ["08:00-09:00", "09:00-10:00", "10:00-11:00"]
        console.log("BOOKSLOTS ",bookedSlots_list); // Affiche: ["08:00-09:00", "09:00-10:00", "10:00-11:00"]
        setTimeSlots(currentTimeSlots);
    } catch (err) {
        setError("Failed to update booking duration");
    }
  }, [corporation, date]);

  const handleTimeSlotSelection = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
    console.log("Créneau sélectionné :", timeSlot);
  };

  // Fonction de gestion de la réservation
  const handleReservation = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    // Validation des champs
    if (!date || !selectedTimeSlot) {
      toast.error("Veuillez choisir une date et un créneau disponible.");
      setLoading(false);
      return;
    }

    try {
      // Requête vers l'API pour réserver un créneau
      await axios.post('/bookings', {
        userId: user.id,
        corporationId,
        date,
        timeSlot: selectedTimeSlot
      }).then(() => {
        console.log('Réservation réussie');
        toast.success("Réservation réussie");
        router.refresh();
    }).catch((e) => {
        toast.error(e.response.data);
    });
    } catch (error) {
      console.error('Erreur lors de la réservation', error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleReservation}>
      <div className='flex items-center max-w-50'>
        <div>
          <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
          />
        </div>
        <div className='' style={{ padding: '20px' }}>
          {timeSlots.length > 0 ?
            <>
              <h1>Choisissez un créneau horaire</h1>
              <TimeSlotSelector timeSlots={timeSlots} onSelect={handleTimeSlotSelection} />
              {selectedTimeSlot && <p>Créneau sélectionné : {selectedTimeSlot}</p>}
            </> : <h1>Aucun créneau disponible</h1>
          }
        </div>
      </div>
      <Button type="submit" disabled={loading} className='mt-2'>
        {loading ? "Réservation en cours..." : "Réserver"}
      </Button>
    </form>
  );
};

export default BookingForm;
