"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Copy, Edit, MoreHorizontal, Navigation, Trash } from "lucide-react";

import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent, 
    DropdownMenuLabel,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";

import { City } from '@/types/city';
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";

interface CellActionProps {
    data: City;
}

export const CellAction: React.FC<CellActionProps>= ({
    data
}) => {
    const axios = useAxiosWithAuth();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("City Id copied to the clipboard.")
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/cities/${data._id}`).then(() => {
                router.refresh();
                toast.success("Cities deleted.");
            }).catch((e) => {
                toast.error(e.response.data);
            });
        } catch (error) {
            toast.error("Make sure you removed all corporations using this cities first.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <AlertModal 
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
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
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => router.push(`/city/${data._id}`)}>
                        <Navigation className="mr-2 h-4 w-4" />
                        Consulter
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onCopy(data._id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/cities/${data._id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};