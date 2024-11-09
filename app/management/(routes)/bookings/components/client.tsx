"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@radix-ui/react-separator";
import { ApiList } from "@/components/ui/api-list";

import { columns } from "./columns";
import { Corporation } from '@/types/corporation';
import AddCorporation from "@/components/AddCorporation";
import AddBooking from "@/components/AddBooking";
import BookingDuration from "@/components/BookingDuration";

interface BookingsClientProps {
    data: any
}

export const BookingsClient: React.FC<BookingsClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Réservations (${data.length})`}
                    description="La durée moyenne avant le désistement du client est estimée à 5h. Vos réservervations s'annuleront automatiquement au bout 12h sans validation de votre part."
                />
                <BookingDuration />
                <AddBooking />
            </div>
            <Separator />
            <DataTable searchKey="status" columns={columns} data={data} />
        </>
    );
}