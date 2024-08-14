"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Trash } from "lucide-react";
import { toast } from "react-hot-toast";
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
import { City } from "@/types/city";
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";

const formSchema = z.object({
    label: z.string().min(1),
    images: z.object({ url: z.string() }).array(),
});

type CityType = z.infer<typeof formSchema>;

interface CityFormValues {
    initialData: City | null;   
}

export const CityForm: React.FC<CityFormValues> = ({
    initialData
}) => {
    const axios = useAxiosWithAuth();
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit City" : "Create city";
    const description = initialData ? "Edit city" : "Add a new city";
    const toastMessage = initialData ? "City updated" : "City created";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<CityType>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            images: [],
        }
    });

    const onSubmit = async (data: CityType) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/cities/${params.cityId}`, data).then(() => {
                    toast.success(toastMessage);
                    router.refresh();
                    router.push(`/dashboard/cities`);
                })
                .catch((e) => {
                    toast.error(e.response.data);
                });
            } else {
                await axios.post(`/api/cities`, data).then(() => {
                    toast.success(toastMessage);
                    router.refresh();
                    router.push(`/dashboard/cities`);
                })
                .catch((e) => {
                    toast.error(e.response.data);
                });
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/cities/${params.cityId}`).then(() => {
                toast.success("City deleted.");
                router.refresh();
                router.push(`/dashboard/cities`);
            }).catch((e) => {
                toast.error(e.response.data);
            });
        } catch (error) {
            toast.error("Make sure you removed all corporations using this city first.");
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
                        name="images"
                        render={({ field }) => (
                           <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <ImageUpload 
                                        value={field.value.map((image) => image.url)}
                                        disabled={loading}
                                        onChange={(url) => field.onChange([...field.value, { url }])}
                                        onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                    />
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
                                        <Input disabled={loading} placeholder="City label" {...field} />
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
