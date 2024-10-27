"use client";

import { CalendarDays, PackageCheck, Plus } from 'lucide-react';
import { Button } from './ui/button';

import { useBookingModal } from "@/hooks/use-booking-modal";
import { useParams, useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';
import toast from 'react-hot-toast';
import Loader from '@/components/loader';
import { cn } from "@/lib/utils";

const AddBooking = () => {
  const bookingModal = useBookingModal();
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState<any>(null);

  console.log("ON CLICK");



  const handleClick = () => {
    if (isAuthenticated) {
    bookingModal.onOpen();
    setOpen(false);
    } else {
      toast.error("Veuillez vous connecter pour poursuivre !")
    }
    
  };

  return (
    <div className={cn(`flex items-center ml-auto`)}>

      <Button className="relative flex items-center rounded-lg border-gray-300 px-4 py-2 text-xs gap-2" onClick={handleClick}>
        <CalendarDays size={15} />
          Prendre rendez-vous
      </Button>
    </div>
  );
};

export default AddBooking;
