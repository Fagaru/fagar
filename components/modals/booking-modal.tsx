"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useBookingModal } from "@/hooks/use-booking-modal";
import { Modal } from "@/components/ui/modal";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Corporation } from "@/types/corporation";
import getCorporation from "@/services/getCorporation";
import getBookings from "@/services/getBookings";
import { getTimeSlotsForDate } from "@/lib/timeSlot";
import TimeSlotSelector from "../timeSlotSelector";
import { format } from "date-fns";

const formSchema = z.object({
    userId: z.string(),
    corporationId: z.string().min(1),
    date: z.string(),
    timeSlot: z.string()
});

interface TimeSlot {
    time: string;
    available: boolean;
}

interface BookingModalProps {
    userId: string;
    corporationId: string;
    token: string
}
  
export const BookingModal: React.FC<BookingModalProps> = ({ 
    userId,
    corporationId,
    token
 }) => {
    const bookingModal = useBookingModal();

    const [loading, setLoading] = useState(false);
    const [corporation, setCorporation] = useState<Corporation | null>(null);
    const [timeSlots, setTimeSlots] = useState<any>(null);

    const [error, setError] = useState<string | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
    const [bookSlots, setBookSlots] = useState<any>(null);

    const [date, setDate] = useState<any>(new Date());

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userId: userId,
            corporationId,
            date: '',
            timeSlot: '',
        },
    });

    useEffect(() => {
        const fetchCorporation = async () => {
            try {
              const [corps, bookings] = await Promise.all([
                await getCorporation({ corporationId: corporationId }),
                await getBookings({ corporationId: corporationId, date: format(date, 'yyyy-MM-dd') }),
              ]);
              
              setCorporation(corps);
              setBookSlots(bookings);
            } catch (err) {
                setError("Failed to fetch corporation");
            }
        };
    
        fetchCorporation();
      }, [corporationId, date]);
    
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

    const onSubmit = async (values: z.infer<typeof formSchema>, e: any) => {
        try {
            e.preventDefault();
            setLoading(true);

            values.date = format(date, 'yyyy-MM-dd');;
            values.timeSlot = String(selectedTimeSlot);

            await axios.post('/api/bookings',
                values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }).then(() => {
                    console.log('Réservation réussie');
                    toast.success("Réservation réussie");
                    // router.refresh();
                    window.location.reload();
            }).catch((e) => {
                console.log(e);
                toast.error(e.response.data);
            });
        } catch (error) {
            // Gérer les erreurs
            if (error) {
                console.error('Erreur lors de la réservation', error);
            } else {
                toast.error("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            title="Prendre rendez-vous"
            description="Choisir un créneau parmi ceux disponibles."
            isOpen={bookingModal.isOpen}
            onClose={bookingModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                className="rounded-md border place-items-center"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="timeSlot"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className='' style={{ padding: '20px' }}>
                                                {timeSlots?.length > 0 ?
                                                    <>
                                                    <h1>Choisissez un créneau horaire</h1>
                                                    <TimeSlotSelector timeSlots={timeSlots} onSelect={handleTimeSlotSelection} />
                                                    {selectedTimeSlot && <p>Créneau sélectionné : {selectedTimeSlot}</p>}
                                                    </> : <h1>Aucun créneau disponible</h1>
                                                }
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button
                                    type="button"
                                    disabled={loading}
                                    variant="outline"
                                    onClick={bookingModal.onClose}>
                                        Annuler
                                </Button>
                                <Button disabled={loading} type="submit">Réserver</Button>
                            </div>
                        </form>
                    </Form>  
                </div>
            </div>
        </Modal>
    );
};