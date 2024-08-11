"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().min(1),
    userId: z.string().min(1),
});

interface StoreModalProps {
    userId: string;
    token: string
}
  
export const StoreModal: React.FC<StoreModalProps> = ({ 
    userId,
    token
 }) => {
    const storeModal = useStoreModal();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            userId: userId,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/corporations',
                values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            // Traiter le succès
            toast.success("Première étape réussie.");
            window.location.assign(`/management/${response.data._id}`);
    
        } catch (error: any) {
            // Gérer les erreurs
            if (error.response && error.response.data) {
                toast.error(error.response.data);
            } else {
                toast.error("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            title="Créer une page pour votre entreprise"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nom de votre entreprise</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="..." 
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button
                                    disabled={loading}
                                    variant="outline"
                                    onClick={storeModal.onClose}>
                                        Annuler
                                </Button>
                                <Button disabled={loading} type="submit">Continuer</Button>
                            </div>
                        </form>
                    </Form>  
                </div>
            </div>
        </Modal>
    );
};