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

// Define the schema for the login form using zod
const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
});

// Infer the form type from the schema
type LoginFormType = z.infer<typeof formSchema>;

export const LoginForm: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<LoginFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = async (data: LoginFormType) => {
        try {
            setLoading(true);
            console.log(data);
            await axios.post(`/api/auth/login`, data).then((data) => {
                localStorage.setItem("token", data.data.token);
                const userInfo = data.data.userInfo;
                console.log("userInfo", userInfo);
                localStorage.setItem("user", JSON.stringify(userInfo));
            }).catch((e) => {
                console.log(e);
            });
            router.push(`/dashboard`);
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Heading
                title="Login"
                description="Access your account"
            />
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-1 gap-8">
                        <FormField 
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={loading} 
                                            placeholder="Email" 
                                            {...field} 
                                        />
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
                                        <Input 
                                            type="password" 
                                            disabled={loading} 
                                            placeholder="Password" 
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Login
                    </Button>
                </form>
            </Form>
        </>
    );
};