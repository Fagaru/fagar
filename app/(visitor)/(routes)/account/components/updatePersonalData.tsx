"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

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
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";

// Définition du schéma de validation avec zod
const formSchema = z.object({
    first_name: z.string().min(1, "Prénom requis"),
    last_name: z.string().min(1, "Nom requis"),
    phone: z.string().min(1).optional(),
    birthday: z.date().optional(),
    email: z.string().email("Invalid email address")
});

type ProfileFormType = z.infer<typeof formSchema>;

interface ProfileFormProps {
    initialData: any
}

const ProfileForm: React.FC<ProfileFormProps> = ({
    initialData
}) => {
    const axios = useAxiosWithAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<ProfileFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            birthday: initialData.birthday ? new Date(initialData.birthday) : ''
        } 
            :
            {
            first_name: '',
            last_name: '',
            phone: '',
            email: '',

        }
    });

    const onSubmit = async (data: ProfileFormType) => {
        try {
            setLoading(true);
            await axios.patch(`/users/${initialData._id}`, data).then(() => {
                toast.success("Mise à jour réussie !");
            }).catch((e) => {
                toast.error(e.response.data);
            })
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="relative grid grid-cols-6 p-6 bg-gray-50 dark:bg-gray-950 auto-rows-[minmax(50px,auto)] border-b w-full">
                <div className="relative col-span-6 xl:lg:col-span-2 p-2 gap-2 items-center">
                    <h2 className="text-lg font-semibold">Paramétres généraux</h2>
                    <p className="text-gray-600 text-sm">Modifier vos données personnelles</p>
                </div>
                <div className="relative col-span-6 lg:xl:col-span-4 p-2 rounded-[10px] border-solid gap-2 w-full"> 
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                        <div className="grid grid-cols-6 gap-4">
                            <div className="relative xl:lg:col-span-3 md:col-span-3 col-span-6 ">
                            <FormField 
                                control={form.control}
                                name="last_name"
                                render={({ field }) => (
                                <FormItem>
                                        <FormLabel>Nom</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="ex: Camus" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                </FormItem>
                                )}
                            />
                            </div>
                            <div className="relative xl:lg:col-span-3 md:col-span-3 col-span-6 ">
                            <FormField 
                                control={form.control}
                                name="first_name"
                                render={({ field }) => (
                                <FormItem>
                                        <FormLabel>Prénom</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="ex: Lucas" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                </FormItem>
                                )}
                            />
                            </div>
                            <div className="relative xl:lg:col-span-3 md:col-span-3 col-span-6 ">
                            <FormField 
                                control={form.control}
                                name="birthday"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date de naissance</FormLabel>
                                        <FormControl>
                                            <Input 
                                                disabled={loading} 
                                                type="date" 
                                                placeholder="" 
                                                value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} 
                                                onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)} 
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            </div>
                            <div className="relative xl:lg:col-span-3 md:col-span-3 col-span-6">
                            <FormField 
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                <FormItem>
                                        <FormLabel>Numéro de téléphone</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} type="tel" placeholder="06 21 .. .. .. .." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                </FormItem>
                                )}
                            />
                            </div>
                            <div className="relative xl:lg:col-span-3 md:col-span-3 col-span-6">
                            <FormField 
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} type="email" placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                </FormItem>
                                )}
                            />
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <Button disabled={loading} className="ml-auto" type="submit">
                                Enregistrer
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            </div>
        </>
    );
}

export default ProfileForm;