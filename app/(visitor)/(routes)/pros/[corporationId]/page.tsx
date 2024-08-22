"use client";

import { useEffect, useState } from 'react';

import InfoSection from '@/components/infoSection';
import ContactForm from '@/components/contactForm';
import { Corporation } from '@/types/corporation';
import getCorporation from '@/services/getCorporation';
import Image from "next/image";
import { ReviewSection } from '@/components/reviewSection';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, MapPinned, Phone, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import getCategory from '@/services/getCategory';
import { Category } from '@/types/category';

const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

interface CorporationPageProps {
    params: {corporationId: string}
};

const CorporationPage: React.FC<CorporationPageProps> = ({
    params
}) => {
    const [corporation, setCorporation] = useState<Corporation | null>(null);
    const [category, setCategory] = useState<Category | null>(null);
    const [error, setError] = useState<string | null>(null);
    // let category: any = null;

    useEffect(() => {
        const fetchCorporation = async () => {
            try {
                const data = await getCorporation({
                    corporationId: params.corporationId
                });
                setCorporation(data);
            } catch (err) {
                setError("Failed to fetch corporation");
            }
        };

        fetchCorporation();
    }, [params.corporationId]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                let categoryId = null;
                if(corporation?.categoryId) {
                    // Appelez le service getCategory avec un categoryId valide
                    categoryId = corporation?.categoryId.toString();
                    const cat = await getCategory({ categoryId: categoryId });
                    setCategory(cat);
                }
            } catch (err) {
                setError("Failed to fetch category");
            }
        };

        fetchCategory();
    }, [corporation]);

    const renderSchedule = () => {
        if (!corporation?.schedules || corporation.schedules.length === 0) {
            return <p className="text-center text-gray-500">Horaires non disponibles</p>;
        }
    
        const today = new Date().getDay();  // jour actuel de la semaine (0-6, 0 étant dimanche)
    
        return corporation.schedules.map((schedule, index) => {
            const isToday = schedule.dayWeek === today;
            return (
                <div key={index} className={`p-2 ${isToday ? "bg-rose-100 rounded-[10px] shadow-md" : ""} flex flex-col space-y-2`}>
                    <div className={`font-semibold ${isToday ? "text-rose-600" : "text-gray-800"}`}>{daysOfWeek[schedule.dayWeek]}</div>
                    <div>{schedule.available !== "closed" ? (
                            <div className="space-y-1">
                            <div>Matin: {schedule.begin_am} - {schedule.end_am}</div>
                            <div>Après-midi: {schedule.begin_pm} - {schedule.end_pm}</div>
                        </div>
                    ) : (
                        <div>Fermé</div>
                    )}
                    </div>
                </div>
            );
        });
    };
    

    return (
        <div className='m-6 dark:bg-gray-950'>
            {error && <p>{error}</p>}
            {corporation && (
                <>
                    <div className="relative grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-1 gap-3 p-2 auto-rows-[minmax(50px,auto)]">
                        <div className="relative row-span-6 col-span-2 p-5 rounded-[10px] border-solid border-[1px]">
                            <div className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md shadow-md">
                                <Image 
                                    fill
                                    src={corporation.images[0]?.url || "/default_image.jpg"}
                                    alt="Image"
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        </div>
                        {corporation.images.slice(1,5).map((image,index) => (
                            <div className="relative p-5 row-span-3 rounded-[10px] border-solid border-[1px]" key={index}>
                                <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md shadow-md">
                                    <Image 
                                        fill 
                                        src={image.url} 
                                        alt={`Image ${index + 1}`} 
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 gap-5 p-2 auto-rows-[minmax(100px,auto)]">
                        <div className="p-5 row-span-1 col-span-2 rounded-[10px] border-solid border-y-[1px] h-25 shadow-md">
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
                        <div className="row-span-1 rounded-[10px] flex justify-center">
                            <div className="pl-20 pt-5 pb-5 flex justify-center">
                                <Link
                                    key={`/pros/${corporation._id}`}
                                    href={`/pros/${corporation._id}`}
                                    className='grid grid-cols-1 rounded-xl'
                                >
                                    <span className='font-medium flex justify-center'>Laisser un avis</span>
                                    <ReviewSection stars={4} rating_mode="no-value" />
                                    <Button className='flex justify-center'> Ecrire un avis</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="flex justify-between p-5 row-span-1 col-span-2 rounded-[10px] border-solid border-y-[1px] shadow-md">
                            <div className="grid gap-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 xs:grid-cols-1">
                                <div className="flex justify-center items-center">
                                    <div className="aspect-square relative w-10 h-10 sm:rounded-full overflow-hidden">
                                        <Image 
                                            fill
                                            src="/default_image.jpg"
                                            alt="Image"
                                            className="object-cover object-center"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <span className="font-medium pl-5">{"Engagé pour l'environnement"}</span>
                                </div>
                                <div className="">
                                    <ReviewSection stars={4} rating_mode="read-only" />
                                </div>
                                <div className="flex justify-center items-center">
                                    <a href="#target-comment" className="font-medium">120 commentaires</a>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 row-span-6 rounded-[10px] border-solid border-y-[1px] shadow-md">
                            <div className="pb-5">
                                <InfoSection title="Horaires" content={renderSchedule()} />
                            </div>
                            <span className='font-medium pb-2'>Contact & réseaux sociaux</span>
                            <div className='flex items-center relative p-2'>
                                <Phone />
                                <span className='font-light pl-10'>{corporation.phone}</span>
                            </div>
                            <div className='flex items-center relative p-2'>
                                <MapPinned />
                                <span className='font-light pl-10'>Mon adresse</span>
                            </div>
                            <div className='flex items-center relative p-2'>
                                <Instagram />
                                <span className='font-light pl-10'>{corporation.linkInstagram}</span>
                            </div>
                            <div className='flex items-center relative p-2'>
                                <Facebook />
                                <span className='font-light pl-10'>{corporation.linkFacebook}</span>
                            </div>
                            <div className='flex items-center relative p-2'>
                                <Linkedin />
                                <span className='font-light pl-10'>{corporation.linkLinkedIn}</span>
                            </div>
                            <div className='flex items-center relative p-2'>
                                <X />
                                <span className='font-light pl-10'>{corporation.linkX}</span>
                            </div>
                            <div className='flex items-center relative pt-2'>
                                <ContactForm name_pro={corporation.name} mail_pro={corporation.mail_pro}/>
                            </div>
                        </div>
                        <div className="p-5 row-span-1 col-span-2 rounded-[10px] border-solid border-y-[1px]">
                            <InfoSection title="Description" content={corporation.description} />
                        </div>
                        <div className="p-5 col-span-2 rounded-[10px] border-solid border-y-[1px]">
                            <span className='font-sans font-medium mb-5 text-lg'>Les valeurs de L&apos;entreprise</span>
                            <InfoSection title="Valeur Sociale" content="Lorem ipsum dolor sit amet..." />
                            <InfoSection title="Valeur Environnementale" content="Lorem ipsum dolor sit amet..." />
                        </div>
                        <div className="p-5 col-span-2 rounded-[10px] border-solid border-y-[1px]">
                            <InfoSection title="Services et prestations de l’entreprise" content="loin de moi l'idée de graver dans le marbre de tailler dans une écorce d'arbre loin de moi l'idée de suggérer que je m'en moque que je n'en ai rien à faire que guère je ne m'en soucie loin de moi ces folies mais je m'échine depuis octobre et pourquoi donc depuis début octobre même et qui m'aime me suive depuis octobre depuis ce même dernier octobre le trois du mois je crois depuis ce temps-là depuis trois mois depuis trois mois et une semaine je m'échine ailleurs et le très long texte n'a pas avancé d'un poil pas beaucoup sans doute est-ce mon côté velléitaire qui ne cesse de me jouer des tours et les méandres du très long texte se sont figés comme une gelée le long des parois d'un bocal de verre et je vitupère contre mes essais éphémères mon tempérament affreusement velléitaire et ce teint d'albâtre qui n'est pas le mien comme je voudrais qu'il fût d'albâtre ou d'ébène ou autrement même sans métaphore mais au moins qu'il ait quelque tenue que mon visage sans retenue puisse soudain passer pour un tissu une pierre un songe soit en quelque sorte un tableau fasse tableau mais ce n'est pas le cas même ce mot albâtre jeté au visage jeté tout à trac sur la page en haut de page ce mot me défigure ne me figure pas ne me représente pas ne figure rien de ce que je suis de ce que je pense être et je suis encore et toujours circonspect dans le doute et ce mot n'apporte rien aucune réponse et donc toujours je me jette à la figure ces accusations comme des bouteilles non pas à la mer mais bien dans la gueule oui je me donne des coups de bouteille tessons épars sur le parquet et mes joues ensanglantées enfin que ce soit ou non métaphore que le mot d'albâtre me figure ou non je prends ces coups ces reproches en plein visage et je m'accuse d'être velléitaire aussi bien sûr pour trop entreprendre je lance cent feux il est normal qu'un certain nombre des foyers meure et même ne démarre qu'à peine avant de s'achever dans un bruit de feuilles mouillées de bois mort de bois trop vert encore pour prendre tout cela encore métaphore et toujours métaphore peut-être est-ce le mot albâtre qui appelle autant de métaphores ou bien les conditions d'écriture du très long texte que par facétie ou encore autodérision je pourrais être tenté de rebaptiser très long texte interrompu et l'adjectif interrompu ici au milieu de la ligne interrompt mes songes interrompt le torrent de sornettes lance d'autres tirades propose peut-être d'autres charades mais pour mieux me ramener vers le rivage bourbeux où je ne cesse de me lancer ces reproches à la figure velléitaire velléitaire et me voici encore à ne pas même essayer de me justifier moi-même de tout cela feux mal éteints et feux qui n'ont jamais pris aussi me trouvé-je vingt vaines justifications improbables même si certaines sont justes par ailleurs comme dans le cas du projet de traduire régulièrement et pensais-je au début au moins une fois par semaine un poème et qui s'est enlisé après à peine trois ou quatre tracasseries mais cela reprendra parfois aussi depuis début octobre le trois je crois suspendu à ce mot d'albâtre depuis le trois octobre le trois je crois je me disais que pour être interrompu ou inachevé le très long texte recelait de vraies possibilités et qu'il suffisait suffirait eût suffi de s'y remettre et la machine reprendrait du galon non là cette image-là ne va pas je mélange les formules croise les figures de style et donc je pensais qu'il me faudrait toutes proportions gardées envisager ces carnets comme Paul Valéry travaillant régulièrement et sans espoir d'en finir jamais chaque matin à ses Cahiers désormais regroupés en deux tomes en Pléiade et que j'ai dévorés consultés admirés lus compulsés longuement naguère mais il faudrait dire jadis ou balancer entre les deux lus disons entre 1993 et 1997 et donc toutes proportions gardées je me verrais bien ainsi à reprendre tel chantier interrompu trois mois et le faisant avancer un petit peu mais enfin ce n'est pas possible il ne va pas se comparer à Paul Valéry l'autre oiseux oisif ex-oisien de surcroît ancien oisien into the bargain non il ne va pas se comparer à Paul Valéry tout de même alors que seulement et il nous l'a dit même avec métaphores tout le tintouin oui oui noir sur blanc dit ce n'est rien d'autre qu'un affreux" />
                        </div>
                        <div className="p-5 col-span-2 rounded-[10px] border-solid border-y-[1px]">
                            <InfoSection title="Informations pratiques" content="Lorem ipsum dolor sit amet..." />
                        </div>
                        <div className="p-5 col-span-2 rounded-[10px] border-solid border-y-[1px]">
                            <InfoSection title="Activités" content="Lorem ipsum dolor sit amet..." />
                        </div>
                        <div className="p-5 col-span-2 rounded-[10px] border-solid border-y-[1px]">
                            <InfoSection title="Informations financières et juridiques" content="Lorem ipsum dolor sit amet..." />
                        </div>
                    </div>
                    <div className="p-5 rounded-[10px] border-solid border-y-[1px]" id="target-comment">
                        Commentaires
                    </div>
                    
                </>
            )}
        </div>
    );
}

export default CorporationPage;