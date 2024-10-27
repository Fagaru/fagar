"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDenied: () => void;
    onConfirm: () => void;
    loading: boolean;
    status: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
    isOpen,
    onClose,
    onDenied,
    onConfirm,
    loading,
    status
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const title = status === "confirmed" ? "Réservation déjà validée" : status === "denied" ? "Réservation Refusée" : "Réservation en attente de validation";
    const description = status === "confirmed" ? "Réservation déjà validée" : status === "denied" ? "Réservation Refusée" : "La durée moyenne avant le désistement du client est estimée à 5h. Cette réservation s'annulera automatiquement au bout 12h sans validation de votre part.";

    return (
        <Modal
            title={title}
            description={description}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    Annuler
                </Button>
                <Button disabled={loading || status == "denied"} variant="destructive" onClick={onDenied}>
                    Décliner
                </Button>
                <Button disabled={loading || status == "confirmed" || status == "denied"} onClick={onConfirm}>
                    Valider
                </Button>
            </div>  
        </Modal>
    );
}