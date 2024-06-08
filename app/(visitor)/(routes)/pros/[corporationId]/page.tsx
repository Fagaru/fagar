"use client";

import { useEffect, useState } from 'react';
import Header from '@/components/header';
import SearchBar from '@/components/searchBar';
import ImagesGallery from '@/components/imagesGallery';
import ReviewSection from '@/components/reviewSection';
import InfoSection from '@/components/infoSection';
import ContactForm from '@/components/contactForm';
import { Corporation } from '@/types/corporation';
import getCorporations from '@/services/getCorporations';

const CorporationPage = () => {
    const [corporation, setCorporation] = useState<Corporation | null>(null);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div className='m-6'>
            {error && <p>{error}</p>}
            {corporation && (
                <>
                    <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-1 gap-5 p-2 auto-rows-[minmax(180px,auto)]">
                        <div className="row-span-2 col-span-2 p-5 rounded-[10px] border-solid border-[1px]">
                            {/* <ImagesGallery images={corporation.images[0]} /> */}
                            Image 1
                        </div>
                        <div className="p-5 rounded-[10px] border-solid border-[1px]">
                            Image 2
                        </div>
                        <div className="p-5 rounded-[10px] border-solid border-[1px]">
                            Image 3
                        </div>
                        <div className="p-5 rounded-[10px] border-solid border-[1px]">
                            Image 4
                        </div>
                        <div className="p-5 rounded-[10px] border-solid border-[1px]">
                            Image 5
                        </div>
                    </div>
                    <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-5 p-2 auto-rows-[minmax(180px,auto)]">
                        <div className="p-5 col-span-2 rounded-[10px] border-solid border-[1px]">
                            Logo & adresse
                        </div>
                        <div className="p-5 rounded-[10px] border-solid border-[1px]">
                            Laisser un avis
                        </div>
                        <div className="p-5 col-span-2 rounded-[10px] border-solid border-[1px]">
                            <InfoSection title="Description" content={corporation.description} />
                        </div>
                        <div className="p-5 rounded-[10px] border-solid border-[1px]">
                            Contact & réseaux sociaux
                            <ContactForm name_pro={corporation.name} mail_pro={corporation.mail_pro}/>
                        </div>
                        <div className="p-5 col-span-2 rounded-[10px] border-solid border-[1px]">
                            Les valeurs de L'entreprise
                            <InfoSection title="Valeur Sociale" content="Lorem ipsum dolor sit amet..." />
                        </div>
                        <div className=""></div>
                        <div className="p-5 col-span-2 rounded-[10px] border-solid border-[1px]">
                            <InfoSection title="Services et prestations de l’entreprise" content="Lorem ipsum dolor sit amet..." />
                        </div>
                        <div className=""></div>
                        <div className="p-5 col-span-2 rounded-[10px] border-solid border-[1px]">
                            <InfoSection title="Informations pratiques" content="Lorem ipsum dolor sit amet..." />
                        </div>
                        <div className=""></div>
                        <div className="p-5 col-span-2 rounded-[10px] border-solid border-[1px]">
                            <InfoSection title="Activités" content="Lorem ipsum dolor sit amet..." />
                        </div>
                        <div className=""></div>
                        <div className="p-5 col-span-2 rounded-[10px] border-solid border-[1px]">
                            <InfoSection title="Informations financières et juridiques" content="Lorem ipsum dolor sit amet..." />
                        </div>
                    </div>
                    <div className="p-5 rounded-[10px] border-solid border-[1px]">
                        
                        Commentaires
                    </div>
                </>
            )}
        </div>
    );
}

export default CorporationPage;
