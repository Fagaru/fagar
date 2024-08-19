"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage
} from "@/components/ui/form";
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";
import ImageUpload from "@/components/ui/image-upload";

const formSchema = z.object({
    image: z.array(z.string()).optional(),  // On s'attend à un tableau de chaînes pour les images
});

type ImageFormType = z.infer<typeof formSchema>;

interface ImageFormProps {
    initialData: any
}

const ImageForm: React.FC<ImageFormProps> = ({
    initialData
}) => {
    const axios = useAxiosWithAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<ImageFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: initialData?.image?.url ? [initialData.image.url] : [],  // Initialiser avec l'image existante
        }
    });

    const onSubmit = async (data: ImageFormType) => {
        try {
            setLoading(true);
            await axios.patch(`/api/users/${initialData.userId}`, data).then(() => {
                toast.success("Mise à jour réussie !");
                router.refresh();
            }).catch((e) => {
                toast.error(e.response.data);
            });
        } catch (error) {
            toast.error("Une erreur est survenue.");
        } finally {
            setLoading(false);
        }
    };

    // Cette fonction remplace l'image existante par la nouvelle
    const handleImageChange = (url: string) => {
        form.setValue('image', [url]);  // Remplacer l'image existante par la nouvelle
    };

    const handleImageRemove = (url: string) => {
        form.setValue('image', ["/default_image.jpg"]);  // Supprimer l'image
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
                <div className="">
                    <FormField 
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <ImageUpload 
                                        value={field.value || []} 
                                        disabled={loading} 
                                        onChange={handleImageChange} 
                                        onRemove={handleImageRemove} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="">
                    <Button disabled={loading} className="m-auto" type="submit">
                        Mis à jour photo de profil
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default ImageForm;
