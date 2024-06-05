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
import { City } from "@/types/city";

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
});

type CityType = z.infer<typeof formSchema>;

interface CityFormValues {
    initialData: City | null;   
}

export const CityForm: React.FC<CityFormValues> = ({
    initialData
}) => {
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
            imageUrl: '',
        }
    });

    const onSubmit = async (data: CityType) => {
        try {
            setLoading(true);
            if (initialData) {
                console.log("SUBMIT 2", params.cityId)
                await axios.patch(`/api/cities/${params.cityId}`, data);
            } else {
                await axios.post(`/api/cities`, data);
            }
            router.refresh();
            router.push(`/dashboard/cities`);
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
            await axios.delete(`/api/cities/${params.cityId}`);
            router.refresh();
            router.push(`/dashboard/cities`);
            toast.success("City deleted.");
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
                        name="imageUrl"
                        render={({ field }) => (
                           <FormItem>
                                <FormLabel>Background image</FormLabel>
                                <FormControl>
                                    <ImageUpload 
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={(url) => field.onChange("")}
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
