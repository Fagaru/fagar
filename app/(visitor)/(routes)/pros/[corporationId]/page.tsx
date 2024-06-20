"use client";

import { useEffect, useState } from 'react';

import InfoSection from '@/components/infoSection';
import ContactForm from '@/components/contactForm';
import { Corporation } from '@/types/corporation';
import getCorporations from '@/services/getCorporations';
import Image from "next/image";
import { ReviewSection } from '@/components/reviewSection';
import Link from 'next/link';
import { Facebook, Instagram, MapPinned, Phone, X } from 'lucide-react';
import getCategory from '@/services/getCategory';
import { Category } from '@/types/category';

const CorporationPage = () => {
    const [corporation, setCorporation] = useState<Corporation | null>(null);
    const [category, setCategory] = useState<Category | null>(null);
    const [error, setError] = useState<string | null>(null);
    // let category: any = null;

    useEffect(() => {
        const fetchCorporation = async () => {
            try {
                const data = await getCorporations({});
                setCorporation(data[0]);
            } catch (err) {
                setError("Failed to fetch corporation");
            }
        };

        fetchCorporation();
    }, []);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                let categoryId = null;
                if(corporation?.categoryId) {
                
                    // Appelez le service getCategory avec un categoryId valide
                    categoryId = corporation?.categoryId.toString()
                    const cat = await getCategory({ categoryId });
                    setCategory(cat);
                    console.log("CATEGORY: ", category.label);
                }
                console.log("CATEGORY: ", categoryId);
            } catch (err) {
                setError("Failed to fetch category");
            }
        };

        fetchCategory();
    }, [corporation]);

    return (
        <div className='m-6'>
            {error && <p>{error}</p>}
            {corporation && (
                <>
                    <div className="relative grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-1 gap-5 p-2 auto-rows-[minmax(50px,auto)]">
                        <div className="relative row-span-6 col-span-2 p-5 rounded-[10px] border-solid border-[1px]">
                            {/* <ImagesGallery images={corporation.images[0]} /> */}
                            <div className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
                                    <Image 
                                        fill
                                        src={corporation.images[0]?.url || "/default_image.jpg"}
                                        alt="Image"
                                        className=""
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                        </div>
                        {corporation.images.slice(1,5).map((image,index) => (
                            <div className="relative p-5 row-span-3 rounded-[10px] border-solid border-[1px]" key={index}>
                                <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
                                    <Image 
                                        fill 
                                        src={image.url} 
                                        alt={`Image ${index + 1}`} 
                                        className=""
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </span>
                            </div>
                        ))}
                        {/* <div className="p-5 rounded-[10px] border-solid border-[1px]">
                            <Image 
                                        fill
                                        src={corporation.images[1]?.url || "/default_image.jpg"}
                                        alt="Image"
                                        className="object-cover object-center"
                                    />
                                </div>
                        </div>
                        <div className="p-5 rounded-[10px] border-solid border-[1px]">
                            Image 3
                        </div>
                        <div className="p-5 rounded-[10px] border-solid border-[1px]">
                            Image 4
                        </div>
                        <div className="p-5 rounded-[10px] border-solid border-[1px]">
                            Image 5
                        </div> */}
                    </div>
                    <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-5 p-2 auto-rows-[minmax(100px,auto)]">
                        <div className="p-5 row-span-1 col-span-2 rounded-[10px] border-solid border-y-[1px] h-25">
                            {/* {corporation.address?.label} */}
                            Paris, France
                            <div className="pt-2 flex items-center">
                                <div className="aspect-square relative w-10 h-10 sm:rounded-full overflow-hidden">
                                    <Image 
                                        fill
                                        src="/default_image.jpg"
                                        alt="Image"
                                        className="object-cover object-center"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <span className='pl-5 font-medium'>{corporation.name}</span>
                            </div>
                            <span className='pl-12 font-light text-sm'>{category?.label}</span>
                        </div>
                        <div className="p-5 row-span-1 rounded-[10px]">
                            <div className="pl-20 pt-10">
                                <Link
                                    key={`/pros/${corporation._id}`}
                                    href={`/pros/${corporation._id}`}
                                >
                                    <span className='font-medium pr-10'>Laisser un avis</span>
                                    <ReviewSection stars={4} rating_mode="no-value" />
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center p-5 row-span-1 col-span-2 rounded-[10px] border-solid border-y-[1px]">
                            <div className='grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 items-center'>
                                <div className='flex items-center'>
                                    <div className="aspect-square relative w-10 h-10 sm:rounded-full overflow-hidden">
                                        <Image 
                                            fill
                                            src="/default_image.jpg"
                                            alt="Image"
                                            className="object-cover object-center"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <span className='font-medium pl-5'>Engagé pour l'environnement</span>
                                </div>
                                <div className=''>
                                    <ReviewSection stars={4} rating_mode="read-only" />
                                </div>
                                <div className='flex items-end'>
                                    <span className='font-medium'>120 commentaires</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 row-span-5 rounded-[10px] border-solid border-y-[1px]">
                            <span className='font-medium pb-2'>Contact & réseaux sociaux</span>
                            <div className='flex items-center relative p-2'>
                                <Phone />
                                <span className='font-light pl-10'>06 51 45 74 21</span>
                            </div>
                            <div className='flex items-center relative p-2'>
                                <MapPinned />
                                <span className='font-light pl-10'>Mon adresse</span>
                            </div>
                            <div className='flex items-center relative p-2'>
                                <Instagram />
                                <span className='font-light pl-10'>Compte Instagram</span>
                            </div>
                            <div className='flex items-center relative p-2'>
                                <Facebook />
                                <span className='font-light pl-10'>Compte Facebook</span>
                            </div>
                            <div className='flex items-center relative p-2'>
                                <X />
                                <span className='font-light pl-10'>Compte X</span>
                            </div>
                            <div className='flex items-center relative pt-2'>
                                <ContactForm name_pro={corporation.name} mail_pro={corporation.mail_pro}/>
                            </div>
                        </div>
                        <div className="p-5 col-span-2 rounded-[10px] border-solid border-y-[1px]">
                            <InfoSection title="Description" content={corporation.description} />
                        </div>
                        <div className="">
                        </div>
                        <div className="p-5 col-span-2 rounded-[10px] border-solid border-y-[1px]">
                            Les valeurs de L'entreprise
                            <InfoSection title="Valeur Sociale" content="Lorem ipsum dolor sit amet..." />
                        </div>
                        <div className=""></div>
                        <div className="p-5 col-span-2 rounded-[10px] border-solid border-y-[1px]">
                            <InfoSection title="Services et prestations de l’entreprise" content="Lorem ipsum dolor sit amet..." />
                        </div>
                        <div className=""></div>
                        <div className="p-5 col-span-2 rounded-[10px] border-solid border-y-[1px]">
                            <InfoSection title="Informations pratiques" content="Lorem ipsum dolor sit amet..." />
                        </div>
                        <div className=""></div>
                        <div className="p-5 col-span-2 rounded-[10px] border-solid border-y-[1px]">
                            <InfoSection title="Activités" content="Lorem ipsum dolor sit amet..." />
                        </div>
                        <div className=""></div>
                        <div className="p-5 col-span-2 rounded-[10px] border-solid border-y-[1px]">
                            <InfoSection title="Informations financières et juridiques" content="Lorem ipsum dolor sit amet..." />
                        </div>
                    </div>
                    <div className="p-5 rounded-[10px] border-solid border-y-[1px]">
                        
                        Commentaires
                    </div>
                </>
            )}
        </div>
    );
}

export default CorporationPage;
