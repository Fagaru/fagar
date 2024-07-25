"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
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
import { ROLES } from "@/models/user.model";

// Définition du schéma de validation avec zod
const formSchema = z.object({
    first_name: z.string().min(1, "Prénom requis"),
    last_name: z.string().min(1, "Nom requis"),
    phone: z.string().min(1).optional(),
    birthday: z.date().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(['visitor', 'professional', 'admin']).optional()
});

type RegisterFormType = z.infer<typeof formSchema>;

interface RegisterFormValues {
    role: ROLES;   
}

export const RegisterForm: React.FC<RegisterFormValues> = ({
    role
}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<RegisterFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            password: '',
        }
    });

    const onSubmit = async (data: RegisterFormType) => {
        try {
            setLoading(true);
            data.role = role;
            await axios.post(`/api/auth/register`, data);
            router.push(`/login`);
            toast.success("User registered successfully");
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Register"
                    description="Create a new account"
                />
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-2 gap-8">
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
                        <FormField 
                            control={form.control}
                            name="birthday"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Votre Date de naissance</FormLabel>
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

                        <FormField 
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                               <FormItem>
                                    <FormLabel>Votre numéro de téléphone</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} type="tel" placeholder="06 21 .. .. .. .." {...field} />
                                    </FormControl>
                                    <FormMessage />
                               </FormItem>
                            )}
                        />
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
                        <FormField 
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                               <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" disabled={loading} placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                               </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Register
                    </Button>
                </form>
            </Form>
        </>
    );
}

export default RegisterForm;