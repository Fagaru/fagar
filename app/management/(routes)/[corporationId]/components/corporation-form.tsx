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
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Corporation } from "@/types/corporation";
import { Category } from "@/types/category";

const formSchema = z.object({
    name: z.string().min(1),
    userId: z.string().min(1).optional(),
    images: z.object({ url: z.string() }).array(),
    categoryId: z.string().min(1),
    isActive: z.boolean().default(false).optional(),
    isSuspended: z.boolean().default(false).optional(),
});

const formSchemaAddress = z.object({
    name: z.string().min(1),
    lat: z.string(),
    lng: z.string(),
    placeId: z.string().min(1),
    label: z.string().min(1),
});

type CorporationFormValues = z.infer<typeof formSchema>;

interface CorporationFormProps {
    initialData: Corporation | null; 
    categories: Category[]
}

export const CorporationForm: React.FC<CorporationFormProps> = ({
    initialData,
    categories
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit company" : "Create company";
    const description = initialData ? "Edit company" : "Add a new company";
    const toastMessage = initialData ? "Company updated" : "Company created";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<CorporationFormValues> ({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData
        } : {
            name: '',
            userId: '',
            images: [],
            categoryId: '',
            isActive: false,
            isSuspended: false,
        }
    });

    const onSubmit = async (data: CorporationFormValues) => {
        try {
            setLoading(true);
            if (initialData){
                await axios.patch(`/api/corporations/${params.corporationId}`, data);
            } else {
                await axios.post(`/api/corporations`, data);
            }
            router.refresh();
            router.push(`/management/${params.corporationId}`);
            toast.success(toastMessage);
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            console.log("Submit done !")
            setLoading(true);
            await axios.delete(`/api/corporations/${params.corporationId}`);
            router.refresh();
            router.push(`/management`);
            toast.success("Product deleted.");
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
                            name="name"
                            render={({ field }) => (
                               <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Product name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                               </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                               <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select 
                                        disabled={loading} 
                                        onValueChange={field.onChange} 
                                        value={field.value} 
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue 
                                                    defaultValue={field.value} 
                                                    placeholder="Select a category"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category._id}
                                                    value={category._id}
                                                >
                                                    {category.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                               </FormItem>   
                            )}
                        />
                        
                        <FormField 
                            control={form.control}
                            name="isActive"
                            render={({ field }) => (
                               <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl >
                                        <Checkbox 
                                            checked={field.value}
                                            // @ts-ignore
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Actif
                                        </FormLabel>
                                        <FormDescription>
                                            Cette entreprise sera affichée dans les recherches.
                                        </FormDescription>
                                    </div>
                               </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="isSuspended"
                            render={({ field }) => (
                               <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl >
                                        <Checkbox 
                                            checked={field.value}
                                            // @ts-ignore
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Suspendre
                                        </FormLabel>
                                        <FormDescription>
                                            Le compte associé à cette entreprise n'aura plus les droits.
                                        </FormDescription>
                                    </div>
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