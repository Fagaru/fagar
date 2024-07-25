"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { CalendarCheck, Facebook, Instagram, Linkedin, Trash, X } from "lucide-react";
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
    Select as UiSelect, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Corporation } from "@/types/corporation";
import { Category } from "@/types/category";
import { Textarea } from "@/components/ui/textarea";
import { Controller } from "react-hook-form";
import getTags from "@/services/getTags";
import { Tag } from "@/types/tag";

import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

// import Tag as TagType from "@/types/tag";


const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

const scheduleSchema = z.object({
    dayWeek: z.number().min(0).max(6),
    begin_am: z.string().optional(),
    end_am: z.string().optional(),
    begin_pm: z.string().optional(),
    end_pm: z.string().optional(),
    available: z.string().min(1),
});

const addressSchema = z.object({
    label: z.string().min(0).optional(),
    // lat: z.string(),
    // lng: z.string(),
    // placeId: z.string().min(1),
    // label: z.string().min(1),
});

const tagSchema = z.object({
    // _id: z.string().min(1).optional(),
    label: z.string().min(1).optional()
});

const formSchema = z.object({
    name: z.string().min(1),
    userId: z.string().min(1).optional(),
    images: z.object({ url: z.string() }).array(),
    address: addressSchema.optional(),
    tags: tagSchema.array().optional(),
    categoryId: z.string().min(1),
    mail_pro: z.string().min(1),
    phone: z.string().min(1),
    description: z.string().min(20),
    schedules: scheduleSchema.array().optional(),
    linkFacebook: z.string().min(0).optional(),
    linkInstagram: z.string().min(0).optional(),
    linkLinkedIn: z.string().min(0).optional(),
    linkX: z.string().min(0).optional(),
    starting_date: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format" }).optional(),
    siret_num: z.string().optional(),
    siren_num: z.string().optional(),
    code_naf: z.string().optional(),
    isActive: z.boolean().default(false).optional(),
    isSuspended: z.boolean().default(false).optional(),
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
    const [availableTags, setAvailableTags] = useState<any>([]);

    useEffect(() => {
        // Fetch available tags from the backend
        const fetchTags = async () => {
            try {
                // const fetchedData = await getTags();
                // setAvailableTags(fetchedData.map(tag => ({label: tag.label})));
                const current_tags = initialData?.tags;
                setAvailableTags(current_tags);
            } catch (error) {
                console.error('Error fetching tags', error);
            }
        };

        fetchTags();
    }, []);

    const title = initialData ? "Edit company" : "Create company";
    const description = initialData ? "Edit company" : "Add a new company";
    const toastMessage = initialData ? "Company updated" : "Company created";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<CorporationFormValues> ({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            schedules: initialData.schedules.length > 0 ? initialData.schedules : daysOfWeek.map((day, index) => ({
                dayWeek: index,
                begin_am: '08:00',
                end_am: '12:00',
                begin_pm: '14:00',
                end_pm: '17:00',
                available: "closed"
            }))
        } : {
            name: '',
            userId: '',
            images: [],
            categoryId: '',
            tags: [],
            address: {},
            isActive: false,
            isSuspended: false,
            schedules: daysOfWeek.map((day, index) => ({
                dayWeek: index,
                begin_am: '08:00',
                end_am: '12:00',
                begin_pm: '14:00',
                end_pm: '17:00',
                available: "open"
            })),
            starting_date: "",
            siret_num: '',
            siren_num: '',
            code_naf: '',
            linkFacebook: '',
            linkInstagram: '',
            linkLinkedIn: '',
            linkX: ''
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
            router.push(`/pros/${params.corporationId}`);
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
            await axios.delete(`/api/corporations/${params.corporationId}`);
            router.refresh();
            router.push(`/management`);
            toast.success("Corporation deleted.");
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
                    <div className="relative grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-1 xs:grid-cols-1 gap-5 p-2 auto-rows-[minmax(50px,auto)]">
                        <div className="relative xl:lg:col-span-1 md:col-span-2 xs:col-span-3 p-5 rounded-[10px] border-solid border-[1px]">
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                        <FormLabel>Nom de votre entreprise</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="ex: Fagar Inc" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="relative xl:lg:col-span-1 md:col-span-2 xs:col-span-3 p-5 rounded-[10px] border-solid border-[1px]">
                            <FormField 
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                <FormItem>
                                        <FormLabel>Téléphone</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} type="phone" placeholder="ex: 06 31 45 85 94" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="relative xl:lg:col-span-1 md:col-span-2 xs:col-span-3 p-5 rounded-[10px] border-solid border-[1px]">
                        <FormField 
                            control={form.control}
                            name="mail_pro"
                            render={({ field }) => (
                               <FormItem>
                                    <FormLabel>Adresse Email</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} type="email" placeholder="ex: entreprise@fagar.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                               </FormItem>
                            )}
                        />
                        </div>
                        <div className="relative xl:lg:col-span-1 md:col-span-2 xs:col-span-3 p-5 rounded-[10px] border-solid border-[1px]">
                        <FormField 
                            control={form.control}
                            name="address.label"
                            render={({ field }) => (
                               <FormItem>
                                    <FormLabel>Adresse</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} type="address" placeholder="ex: 14 rue de la Fourche" {...field} />
                                    </FormControl>
                                    <FormMessage />
                               </FormItem>
                            )}
                        />
                        </div>
                        <div className="relative xl:lg:col-span-1 md:col-span-2 xs:col-span-3 p-5 rounded-[10px] border-solid border-[1px]">
                        <FormField 
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                               <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <UiSelect 
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
                                    </UiSelect>
                                    <FormMessage />
                               </FormItem>   
                            )}
                        />
                        </div>
                        <div className="relative xl:lg:col-span-1 md:col-span-2 xs:col-span-3 p-5 rounded-[10px] border-solid border-[1px]">
                            {/* Add Tags */}
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tags</FormLabel>
                                        <FormControl>
                                        <Controller
                                                control={form.control}
                                                name="tags"
                                                render={({ field: { value, onChange } }) => {
                                                    const selectedTagObjects = value?.map(val => {
                                                        let foundTag;
                                                        if (val !== undefined && val.label !== undefined) {
                                                            if(val){
                                                                foundTag = availableTags.find((tag: any) => tag.label === val.label);
                                                            } else {
                                                                foundTag = availableTags.find((tag: any) => tag === String(val));
                                                            }
                                                            return {
                                                                value: foundTag?.label,
                                                                label: foundTag?.label,
                                                            };
                                                        }
                                                        // return {
                                                        //     value: foundTag?.label,
                                                        //     label: foundTag?.label,
                                                        // };
                                                    });

                                                    console.log("SELECTEDOPT", selectedTagObjects);

                                                    return (
                                                        <CreatableSelect
                                                            isMulti
                                                            options={availableTags.map((tag: any) => ({
                                                                value: tag.label
                                                            }))}
                                                            value={selectedTagObjects}
                                                            onChange={(selectedOptions) => {
                                                                const selectedTagsOpt = selectedOptions.map(option => ({
                                                                    label: option.value,
                                                                }));
                                                                onChange(selectedTagsOpt);
                                                            }}
                                                            placeholder="Sélectionner ou ajouter des tags"
                                                            isDisabled={loading}
                                                            onCreateOption={async (inputValue) => {
                                                                const newTagLabel = inputValue.trim();
                                                                const newTag = { label: newTagLabel };

                                                                // Check for duplicates before adding
                                                                const isDuplicate = availableTags.some((tag: any) => tag.label === newTagLabel);
                                                                if (!isDuplicate) {
                                                                    setAvailableTags((prevTags: any) => [...prevTags, newTag]);
                                                                    if (Array.isArray(value)) {
                                                                        onChange(Array.from(new Set([...value, newTag])));
                                                                    } else {
                                                                        onChange([newTag]);
                                                                    }

                                                                    toast.success('Tag added');
                                                                } else {
                                                                    toast.error('Tag already exists');
                                                                }
                                                            }}
                                                        />
                                                    );
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        
                        <div className="relative row-span-2 col-span-3 p-5 rounded-[10px] border-solid border-[1px]">
                            <FormField 
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea disabled={loading} placeholder="Faites une bréve présentation de votre entreprise" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>


                        <div className="relative xl:lg:col-span-2 md:col-span-2 xs:col-span-3 row-span-4 p-5 rounded-[10px] border-solid border-[1px]">
                            <FormField 
                                control={form.control}
                                name="schedules"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>{"Horaires d'ouverture"}</FormLabel>
                                    {daysOfWeek.map((day, index) => (
                                        <div key={index} className="flex flex-col mb-4">
                                            <FormLabel>{day}</FormLabel>
                                            <div className="flex space-x-4">
                                                <Controller
                                                    name={`schedules.${index}.begin_am`}
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <Input
                                                            type="time"
                                                            placeholder="Begin AM"
                                                            value={field.value || ''}
                                                            onChange={(e) => field.onChange(e.target.value)}
                                                            disabled={loading}
                                                        />
                                                    )}
                                                />
                                                <Controller
                                                    name={`schedules.${index}.end_am`}
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <Input
                                                            type="time"
                                                            placeholder="End AM"
                                                            value={field.value || ''}
                                                            onChange={(e) => field.onChange(e.target.value)}
                                                            disabled={loading}
                                                        />
                                                    )}
                                                />
                                                <Controller
                                                    name={`schedules.${index}.begin_pm`}
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <Input
                                                            type="time"
                                                            placeholder="Begin PM"
                                                            value={field.value || ''}
                                                            onChange={(e) => field.onChange(e.target.value)}
                                                            disabled={loading}
                                                        />
                                                    )}
                                                />
                                                <Controller
                                                    name={`schedules.${index}.end_pm`}
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <Input
                                                            type="time"
                                                            placeholder="08:00"
                                                            value={field.value || ''}
                                                            onChange={(e) => field.onChange(e.target.value)}
                                                            disabled={loading}
                                                        />
                                                    )}
                                                />
                                                <Controller
                                                    name={`schedules.${index}.available`}
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <UiSelect
                                                            disabled={loading}
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue
                                                                        defaultValue={field.value}
                                                                        placeholder="Availability"
                                                                    />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="open">Open</SelectItem>
                                                                <SelectItem value="closed">Closed</SelectItem>
                                                            </SelectContent>
                                                        </UiSelect>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="relative xl:lg:col-span-1 md:col-span-2 xs:col-span-3 p-5 rounded-[10px] border-solid border-[1px]">
                            <FormField 
                                control={form.control}
                                name="linkFacebook"
                                render={({ field }) => (
                                <FormItem>
                                        <FormLabel className="flex items-center"><Facebook size={30} className="pr-2" />Lien vers votre compte Facebook</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                </FormItem>
                                )}
                            />
                            </div>
                        <div className="relative xl:lg:col-span-1 md:col-span-2 xs:col-span-3 p-5 rounded-[10px] border-solid border-[1px]">
                            <FormField 
                                control={form.control}
                                name="linkInstagram"
                                render={({ field }) => (
                                <FormItem>
                                        <FormLabel className="flex items-center"><Instagram size={30} className="pr-2" /> Lien vers votre compte Instagram </FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                </FormItem>
                                )}
                            />
                         </div>
                        <div className="relative xl:lg:col-span-1 md:col-span-2 xs:col-span-3 p-5 rounded-[10px] border-solid border-[1px]">
                            <FormField 
                                control={form.control}
                                name="linkLinkedIn"
                                render={({ field }) => (
                                <FormItem>
                                        <FormLabel className="flex items-center"><Linkedin size={30} className="pr-2" />Lien vers votre compte LinkedIn</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="relative xl:lg:col-span-1 md:col-span-2 xs:col-span-3 p-5 rounded-[10px] border-solid border-[1px]">
                            <FormField 
                                control={form.control}
                                name="linkX"
                                render={({ field }) => (
                                <FormItem>
                                        <FormLabel className="flex items-center"><X size={30} className="pr-2" />Lien vers votre compte X</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="relative row-span-1 xl:lg:col-span-1 md:col-span-2 xs:col-span-3 p-5 rounded-[10px] border-solid border-[1px]">
                            <FormField 
                                control={form.control}
                                name="starting_date"
                                render={({ field }) => (
                                <FormItem>
                                        <FormLabel className="flex items-center"><CalendarCheck size={30} className="pr-2" />Date de création de votre entreprise</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                // placeholder="08:00"
                                                value={field.value ? new Date(field.value).toISOString().split('T')[0] : ""}
                                                onChange={(e) => field.onChange(e.target.value)}
                                                disabled={loading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="relative row-span-1 xl:lg:col-span-1 md:col-span-2 xs:col-span-3 p-5 rounded-[10px] border-solid border-[1px]">
                            <FormField 
                                control={form.control}
                                name="siret_num"
                                render={({ field }) => (
                                <FormItem>
                                        <FormLabel>Siret</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="relative row-span-1 xl:lg:col-span-1 md:col-span-2 xs:col-span-3 p-5 rounded-[10px] border-solid border-[1px]">
                            <FormField 
                                control={form.control}
                                name="siren_num"
                                render={({ field }) => (
                                <FormItem>
                                        <FormLabel>Siren</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="relative row-span-1 xl:lg:col-span-1 md:col-span-2 xs:col-span-3 p-5 rounded-[10px] border-solid border-[1px]">
                            <FormField 
                                control={form.control}
                                name="code_naf"
                                render={({ field }) => (
                                <FormItem>
                                        <FormLabel>Code NAF</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
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
                                            {"Le compte associé à cette entreprise n'aura plus les droits."}
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