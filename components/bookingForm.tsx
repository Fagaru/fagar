"use client";

import { useState } from 'react';
import { useAuth } from "@/context/authContext";
import useAxiosWithAuth from '@/hooks/useAxiosWithAuth';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

interface BookingProps {
  corporationId: string;
};

const BookingForm: React.FC<BookingProps> = ({ corporationId }) => {
  const { user, isAuthenticated } = useAuth();
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState({ startTime: '', endTime: '' }); // Structure pour timeSlot
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const axios = useAxiosWithAuth();

  // Fonction de gestion de la réservation
  const handleReservation = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const { startTime, endTime } = timeSlot;

    // Validation des champs
    if (!date || !startTime || !endTime) {
      alert("Veuillez remplir tous les champs.");
      setLoading(false);
      return;
    }

    // Vérification que l'heure de fin est après l'heure de début
    if (endTime <= startTime) {
      alert("L'heure de fin doit être après l'heure de début.");
      setLoading(false);
      return;
    }

    console.log("BOOKING FORM", user);

    try {
      // Requête vers l'API pour réserver un créneau
      await axios.post('/bookings', {
        userId: user.id, // Obtenu via l'authentification
        corporationId,
        date,
        timeSlot: {
          startTime, // Heure de début
          endTime,   // Heure de fin
        },
      }).then(() => {
        console.log('Réservation réussie');
        toast.success("Réservation réussie");
        router.refresh();
        // router.push(`/pros/${params.corporationId}`);
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
      <div>
        <label>Date de réservation :</label>
        <input 
          type="date"
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Heure d'arrivée :</label>
        <input 
          type="time"
          value={timeSlot.startTime}
          onChange={(e) => setTimeSlot({ ...timeSlot, startTime: e.target.value })} 
          required 
        />
      </div>
      <div>
        <label>Heure de fin :</label>
        <input 
          type="time" 
          value={timeSlot.endTime} 
          onChange={(e) => setTimeSlot({ ...timeSlot, endTime: e.target.value })} 
          required 
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Réservation en cours..." : "Réserver"}
      </button>
    </form>
  );
};

export default BookingForm;
