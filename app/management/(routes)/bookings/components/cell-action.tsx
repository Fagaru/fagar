// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { Copy, Edit, MoreHorizontal, Navigation, Trash } from "lucide-react";

// import { 
//     DropdownMenu,
//     DropdownMenuTrigger,
//     DropdownMenuContent, 
//     DropdownMenuLabel,
//     DropdownMenuItem
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { AlertModal } from "@/components/modals/alert-modal";

// // import { ProductColumn } from "./columns";
// import { Booking } from '@/types/booking';
// import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";
// import { format, parse } from "date-fns";
// import { BookingModal } from "./booking-modal";


// interface CellActionProps {
//     data: Booking;
// }

// export const CellAction: React.FC<CellActionProps>= ({
//     data
// }) => {
//     const axios = useAxiosWithAuth();
//     const router = useRouter();

//     const [loading, setLoading] = useState(false);
//     const [open, setOpen] = useState(false);

//     const onCopy = (id: string) => {
//         navigator.clipboard.writeText(id);
//         toast.success("Booking Id copied to the clipboard.")
//     };

//     // const onUpdate = (id: string) => {
//     //     return <BookingAlert description="La durée moyenne avant le désistement du client est estimée à 5h. Cette réservation s'annulera automatiquement au bout 6h sans validation de votre part." title="Réservation en attente de validation" variant="normal" bookingId={id} />
//     // };

//     const onActions = async (status: string) => {
//         try {
//             let message = status === "confirmed" ? "Réservation validée." : "Réservation refusée.";

//             if (status === "denied") {
//                 console.log("Component denied ON")
//                 return <AlertModal 
//                             isOpen={true}
//                             onClose={() => setOpen(false)}
//                             onConfirm={onDenied}
//                             loading={loading}
//                         />
//             }

//             setLoading(true);
//             await axios.patch(`/bookings/${data._id}`, {status});
//             router.refresh();
//             toast.success(message); 
//         } catch (error) {
//             toast.error("Something went wrong.");
//         } finally {
//             setLoading(false);
//             setOpen(false);
//         }
//     };

//     const onDenied = async () => {
//         try {
//             let message = "Réservation refusée.";
//             console.log("Component denied ON", message)
//             setLoading(true);
//             await axios.patch(`/bookings/${data._id}`, {status});
//             router.refresh();
//             toast.success(message); 
//         } catch (error) {
//             toast.error("Something went wrong.");
//         } finally {
//             setLoading(false);
//             setOpen(false);
//         }
//     };

//     return (
//         <>
//             <BookingModal 
//                 isOpen={open}
//                 onClose={() => setOpen(false)}
//                 onDenied={() => onActions("denied")}
//                 onConfirm={() => onActions("confirmed")}
//                 loading={loading}
//                 status={data.status}
//             />
//             <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" className="h-8 w-8 p-0">
//                         <span className="sr-only">Open menu</span>
//                         <MoreHorizontal className="h-4 w-4" />
//                     </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                     <DropdownMenuLabel>
//                         Actions
//                     </DropdownMenuLabel>
//                     <DropdownMenuItem onClick={() => setOpen(true)}>
//                         <Edit className="mr-2 h-4 w-4" />
//                         Mettre à jour le statut
//                     </DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => onCopy(data._id)}>
//                         <Copy className="mr-2 h-4 w-4" />
//                         Copy Id
//                     </DropdownMenuItem>
//                 </DropdownMenuContent>
//             </DropdownMenu>
//         </>
//     );
// };

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Copy, Edit, MoreHorizontal } from "lucide-react";

import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent, 
    DropdownMenuLabel,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";

import { Booking } from '@/types/booking';
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";
import { BookingModal } from "./booking-modal";

interface CellActionProps {
    data: Booking;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const axios = useAxiosWithAuth();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Booking Id copied to the clipboard.");
    };

    const onActions = async (status: string) => {
        try {
            let message = status === "confirmed" ? "Réservation validée." : "Réservation refusée.";

            if (status === "denied") {
                setAlertOpen(true);
                return; // Stop execution here, alert modal will handle the denial
            }

            setLoading(true);
            await axios.patch(`/bookings/${data._id}`, { status });
            router.refresh();
            toast.success(message);
        } catch (error) {
            toast.error("Something went wrong while updating the booking status.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    const onDenied = async () => {
        try {
            setLoading(true);
            await axios.patch(`/bookings/${data._id}`, { status: "denied" });
            router.refresh();
            toast.success("Réservation refusée.");
        } catch (error) {
            toast.error("Failed to deny the booking.");
        } finally {
            setLoading(false);
            setAlertOpen(false);
        }
    };

    return (
        <>
            <BookingModal 
                isOpen={open}
                onClose={() => setOpen(false)}
                onDenied={() => onActions("denied")}
                onConfirm={() => onActions("confirmed")}
                loading={loading}
                status={data.status}
            />
            <AlertModal 
                title="Refus de la réservation en cours..."
                description=""
                isOpen={alertOpen}
                onClose={() => setAlertOpen(false)}
                onConfirm={onDenied}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Mettre à jour le statut
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onCopy(data._id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Id
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
