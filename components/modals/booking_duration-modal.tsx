"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Modal } from "@/components/ui/modal";
import {
    Form, 
    FormControl, 
    FormField, 
    FormItem,
    FormLabel,
    FormMessage 
} from "@/components/ui/form";

import { Corporation } from "@/types/corporation";
import getCorporation from "@/services/getCorporation";

import { format } from "date-fns";
import { Input } from "../ui/input";

import { useBookingDurationModal } from "@/hooks/use-booking_duration-modal";
import { Button } from "../ui/button";

const formSchema = z.object({
    userId: z.string(),
    corporationId: z.string().min(1),
    duration_booking: z.string(),
});

interface BookinDurationModalProps {
    userId: string;
    corporationId: string;
    token: string
}
  
export const BookingDurationModal: React.FC<BookinDurationModalProps> = ({ 
    userId,
    corporationId,
    token
 }) => {
    const bookingdurationModal = useBookingDurationModal();

    const [loading, setLoading] = useState(false);
    const [corporation, setCorporation] = useState<Corporation | null>(null);
    const [duration, setDuration] = useState<any>(null);

    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userId: userId,
            corporationId,
            duration_booking: '00:30',

        },
    });

    useEffect(() => {
        const fetchCorporation = async () => {
            try {
              const fetchCorporation = await getCorporation({ corporationId: corporationId });
              setCorporation(fetchCorporation);
            } catch (err) {
                setError("Failed to fetch corporation");
            }
        };
    
        fetchCorporation();
      }, [corporationId]);
    
    useEffect(() => {
        try {
            const durationBooking: any = corporation?.duration_booking;
            setDuration(durationBooking);
        } catch (err) {
            setError("Failed to update booking duration");
        }
    }, [corporation]);

    const onSubmit = async (values: z.infer<typeof formSchema>, e: any) => {
        try {
            e.preventDefault();
            
            setLoading(true);
            await axios.patch(`/api/corporations/${corporationId}/duration_booking`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }).then(() => {
                    console.log('Durée de réservation réussie');
                    toast.success("Durée de réservation réussie");
                    bookingdurationModal.onClose();
                    router.refresh();
                    // window.location.reload();
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
            isOpen={bookingdurationModal.isOpen}
            onClose={bookingdurationModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="duration_booking"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                        <Input id="duration" type="time" {...field || '01:00'} />
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
                                    onClick={bookingdurationModal.onClose}>
                                        Annuler
                                </Button>
                                <Button disabled={loading} type="submit">Confirmer</Button>
                            </div>
                        </form>
                    </Form>  
                </div>
            </div>
        </Modal>
    );
};