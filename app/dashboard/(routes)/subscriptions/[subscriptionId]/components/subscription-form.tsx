"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import { Subscription } from "@/types/subscription";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    label: z.string().min(1),
    description: z.string().min(10),
    price: z.number(),
});

type SubscriptionType = z.infer<typeof formSchema>;

interface SubscriptionFormValues {
    initialData: Subscription | null;   
}

export const SubscriptionForm: React.FC<SubscriptionFormValues> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit subscription" : "Create subscription";
    const description = initialData ? "Edit subscription" : "Add a new subscription";
    const toastMessage = initialData ? "Subscription updated" : "Subscription created";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<SubscriptionType>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            description: '',
            price: 0,
        }
    });

    const onSubmit = async (data: SubscriptionType) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/subscriptions/${params.subscriptionId}`, data);
            } else {
                await axios.post('/api/subscriptions', data);
            }
            router.refresh();
            router.push('/dashboard/subscriptions');
            toast.success(toastMessage);
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/subscriptions/${params.subscriptionId}`);
            router.refresh();
            router.push(`/dashboard/subscriptions`);
            toast.success("Subscription deleted.");
        } catch (error) {
            toast.error("Make sure you removed all corporations using this subscription first.");
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
                <Heading
                    title={title}
                    description={description}
                />
                {initialData && (
                 <Button
                    disabled={loading}
                    variant="destructive"
                    size="icon"
                    onClick={() => setOpen(true)}
                 >
                    <Trash className="h-4 w-4" />
                 </Button> 
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <FormField 
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                           <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea disabled={loading} placeholder="Description brève de l'offre" {...field} />
                                </FormControl>
                                <FormMessage />
                           </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                               <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Nom de l'offre" {...field} />
                                    </FormControl>
                                    <FormMessage />
                               </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                               <FormItem>
                                    <FormLabel>{"Prix de l'abonnement mensuel"}</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Prix" {...field} />
                                    </FormControl>
                                    <FormMessage />
                               </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
}
