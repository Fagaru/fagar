"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
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
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { Trash } from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";

// Définition du schéma de validation avec zod
const formSchema = z.object({
    first_name: z.string().min(1, "Prénom requis"),
    last_name: z.string().min(1, "Nom requis"),
    phone: z.string().min(1).optional(),
    birthday: z.date().optional(),
    email: z.string().email("Invalid email address"),
    role: z.enum(['visitor', 'professional', 'admin']).optional(),
    isActive: z.boolean().optional(),
    isSuspended: z.boolean().optional(),
    isVerified: z.boolean().optional()
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
    const params = useParams();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Editer compte" : "Créer un compte";
    const description = initialData ? "Modifier les données utilisateurs de ce compte" : "Remplir les données utilisateurs de ce compte";
    const toastMessage = initialData ? "Compte mis à jour" : "Nouveau compte ajouté";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<ProfileFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            birthday: initialData.birthday ? new Date(initialData.birthday) : ''
        } : {
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            role: 'visitor',
            isActive: false,
            isSuspended: false,
            isVerified: false
        }
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                ...initialData,
                birthday: initialData.birthday ? new Date(initialData.birthday) : ''
            });
        }
    }, [initialData]);

    const onSubmit = async (data: ProfileFormType) => {
        try {
            console.log("DASH SUB USER ", data)
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/users/${initialData._id}/admin`, data).then(() => {
                    router.push('/dashboard/users');
                    router.refresh();
                    toast.success(toastMessage); 
                }).catch((e) => {
                    toast.error(e.response.data);
                })
            } else {
                await axios.post(`/api/users`, data).then(() => {
                    router.push('/dashboard/users');
                    router.refresh();
                    toast.success(toastMessage);
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

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/users/${params.userId}/admin`).then(() => {
                toast.success("Compte supprimé.");
                router.refresh();
                router.push(`/dashboard/users`);
            }).catch((e) => {
                toast.error(e.response.data);
            });
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
            <div className="relative grid grid-cols-6 p-6 bg-gray-50 dark:bg-gray-950 auto-rows-[minmax(50px,auto)] w-full">
                <div className="relative col-span-6 xl:lg:col-span-2 p-2 gap-2 items-center">
                    <h2 className="text-lg font-semibold">Paramétres généraux</h2>
                    <p className="text-gray-600 text-sm">{description}</p>
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
                            <div className="relative xl:lg:col-span-3 md:col-span-3 col-span-6">
                                <FormField 
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Rôle</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Attribuer un rôle à cet utilisateur" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                            <SelectItem value="visitor">Basic</SelectItem>
                                            <SelectItem value="professional">Professionel</SelectItem>
                                            <SelectItem value="admin">Administrateur</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Vous pouvez définir ici le niveau d'accès de l'utilisateur{" "}
                                            <Link href="/examples/forms">email settings</Link>.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </div>
                            <div className="relative xl:lg:col-span-2 md:col-span-2 col-span-6">
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
                                                    Activer
                                                </FormLabel>
                                                <FormDescription>
                                                    {"Etat du compte utilisateur. L'utilisateur n'aura plus accés à son compte si la case est décochée."}
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="relative xl:lg:col-span-2 md:col-span-2 col-span-6">
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
                                                    {"L'utilisateur n'aura plus accès à son compte."}
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="relative xl:lg:col-span-2 md:col-span-2 col-span-6">
                                <FormField 
                                    control={form.control}
                                    name="isVerified"
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
                                                    Vérifier
                                                </FormLabel>
                                                <FormDescription>
                                                    {"Statut des données personnelles de l'utilisateur."}
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <Button disabled={loading} className="ml-auto" type="submit">
                                {action}
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