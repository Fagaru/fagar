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
    oldPassword: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
});

type UpdatePasswordFormType = z.infer<typeof formSchema>;

interface UpdatePasswordFormProps {
    userId: string
}

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({
    userId
}) => {
    const axios = useAxiosWithAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<UpdatePasswordFormType>({
        resolver: zodResolver(formSchema)
    });

    const onSubmit = async (data: UpdatePasswordFormType) => {
        try {
            setLoading(true);
            if (data.newPassword !== data.confirmPassword) {
                toast.error("Vos nouveaux mots de passe ne correspondent pas !");
            } else {
                await axios.patch(`/users/${userId}/new-password`, data).then(() => {
                    toast.success("Mise à jour réussie !");
                }).catch((e) => {
                    toast.error(e.response.data);
                })
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="relative grid grid-cols-6 p-6 bg-gray-50 dark:bg-gray-950 auto-rows-[minmax(50px,auto)]">
                <div className="relative col-span-6 xl:lg:col-span-2 p-2 gap-2 items-center">
                    <h2 className="text-lg font-semibold">Sécurité</h2>
                    <p className="text-gray-600 text-sm">Modifier votre mot de passe</p>
                </div>
                <div className="relative col-span-6 lg:xl:col-span-4 p-2 rounded-[10px] border-solid gap-2"> 
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                        <div className="grid grid-cols-6 gap-4">
                        <div className="relative xl:lg:col-span-2 md:col-span-3 col-span-6 ">
                            <FormField 
                                control={form.control}
                                name="oldPassword"
                                render={({ field }) => (
                                <FormItem>
                                        <FormLabel>Ancien mot de passe</FormLabel>
                                        <FormControl>
                                            <Input 
                                                disabled={loading} 
                                                type="password" 
                                                placeholder="" 
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                </FormItem>
                                )}
                            />
                            </div>
                            <div className="relative xl:lg:col-span-2 md:col-span-3 col-span-6 ">
                            <FormField 
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                <FormItem>
                                        <FormLabel>Nouveau mot de passe</FormLabel>
                                        <FormControl>
                                            <Input 
                                                disabled={loading} 
                                                type="password" 
                                                placeholder="" 
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                </FormItem>
                                )}
                            />
                            </div>
                            <div className="relative xl:lg:col-span-2 md:col-span-3 col-span-6">
                            <FormField 
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmation mot de passe</FormLabel>
                                        <FormControl>
                                            <Input 
                                                disabled={loading} 
                                                type="password" 
                                                placeholder="" 
                                                {...field}
                                            />
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

export default UpdatePasswordForm;