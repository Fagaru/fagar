"use client";

import { useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store-modal";
import { useAuth } from "@/context/authContext";
import Loader from "@/components/loader";

export const ModalProvider = () => {
    const { user, isAuthenticated, token } = useAuth();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || !isAuthenticated) {
        return null;
    }

    return <StoreModal userId={user.id} token={token} />;

}