"use client";

import { useEffect, useState } from "react";

import { BookingModal } from "@/components/modals/booking-modal";
import { useAuth } from "@/context/authContext";
import Loader from "@/components/loader";

interface ModalBookingProviderProps {
    corporationId: string
};

export const ModalBookingProvider: React.FC<ModalBookingProviderProps> = ({
    corporationId
}) => {
    const { user, isAuthenticated, token } = useAuth();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || !isAuthenticated) {
        return null;
    }

    return <BookingModal userId={user.id} token={token} corporationId={corporationId} />;

}