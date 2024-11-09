"use client";

import { useEffect, useState } from "react";

import { BookingDurationModal } from "@/components/modals/booking_duration-modal";
import { useAuth } from "@/context/authContext";
import Loader from "@/components/loader";

interface ModalBookingDurationProviderProps {
    corporationId: string
};

export const ModalBookingDurationProvider: React.FC<ModalBookingDurationProviderProps> = ({
    corporationId
}) => {
    const { user, isAuthenticated, token } = useAuth();
    const [isMounted, setIsMounted] = useState(false);

    console.log(" BOOKING MODAL Corporation ID", corporationId);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || !isAuthenticated) {
        return null;
    }

    return <BookingDurationModal userId={user.id} token={token} corporationId={corporationId} />;

}