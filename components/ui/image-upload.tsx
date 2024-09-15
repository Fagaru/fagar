"use client";

import { useEffect, useState } from "react";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

import { Button } from "@/components/ui/button";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    } 

    if (!isMounted) {
        return null;
    }

    return (
        <div className="relative">
            <div className="relative grid grid-cols-6 gap-5 p-2 auto-rows-[minmax(50px,auto)] w-full">
                {value.map((url) => (
                    <div className="relative col-span-3 xl:lg:col-span-1 md:col-span-2" key={url+1}>
                        <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                            <div className="z-10 absolute top-2 right-2">
                                <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            <Image 
                                fill
                                className="object-cover"
                                alt="Image"
                                src={url}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <CldUploadWidget onUpload={onUpload} uploadPreset="ev7ylaav">
                    {({ open }) => {
                        const onclick =() => {
                            open();
                        }

                        return (
                            <Button
                                type="button"
                                disabled={disabled}
                                variant="secondary"
                                onClick={onclick}
                                className="relative ml-2 pl-6 pr-5"
                            >
                                <ImagePlus className="h-4 w-4 m-2" />
                                charger une image
                            </Button>
                        );
                    }}
            </CldUploadWidget>
        </div>
    );
}

export default ImageUpload;