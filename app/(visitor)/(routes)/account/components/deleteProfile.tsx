"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { AlertModal } from "@/components/modals/alert-modal";
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";
import { useAuth } from "@/context/authContext";

interface DeleteFormValues {
    userId: string;   
}

export const DeleteProfile: React.FC<DeleteFormValues> = ({
    userId
}) => {
    const { logout } = useAuth();
    const axios = useAxiosWithAuth();
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/users/${userId}`).then(() => {
                toast.success("Compte supprimé.");
                logout();
                router.refresh();
                router.push(`/login`);
            }).catch((e) => {
                toast.error(e.response.data);
            });
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal 
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                 <Button
                    disabled={loading}
                    variant="destructive"
                    size="icon"
                    onClick={() => setOpen(true)}
                 >
                    <Trash className="h-4 w-4" />
                 </Button>
            </div>
        </>
    );
}
