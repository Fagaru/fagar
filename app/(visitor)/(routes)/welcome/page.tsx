import getCity from '@/services/getCity';
import Slider from "@/components/carrou";
import Search from '@/components/search';
import getCorporations from '@/services/getCorporations';
import MapBox from '@/providers/map-box'; 
import NewCorps from '@/components/displayNewCorp';
import Image from 'next/image';  
import SearchBar from "@/components/searchBar";
import AddCorporation from "@/components/AddCorporation";
export const dynamic = 'force-dynamic';

const HomePage = async() => {
    const query = { cityId: "6660463ed6a178f0fc300d50" };
    const city = await getCity(query);
    const corporations = await getCorporations({});
   

    return (
        <div>
            <section className="relative w-full h-[60vh] bg-gray-100">
             
                <Slider data={city} />

               
                <div className="absolute inset-0 flex flex-col items-center justify-center p-20 z-20 mt-64">
                    <h1 className="text-4xl md:text-6xl font-bold text-white">Trouver ce que vous voulez</h1>
                    <p className="mt-4 text-xl md:text-2xl text-gray-200">
                        En un click obtenez ce que vous voulez à proximité de chez vous
                    </p>
                    <Search />
                </div>
            </section>

            <section className="relative py-20">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-6">Nouveauté</h2>
                    <h4 className="mt-2 text-gray-500">Ces entreprises nous ont rejoint récemment</h4>
                    <NewCorps Corpo={corporations}/>
                </div>
            </section>

            <section className="relative bg-white py-12">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl font-semibold mb-4">À propos de nous    </h2>
                    <p className="text-gray-600">
                        Nous sommes trois ingénieurs informatiques passionnés et ambitieux, unis par la volonté de soutenir les petites et moyennes entreprises (PME) dans leur transformation digitale. 
                        Ensemble, nous avons développé une application web innovante, spécialement conçue pour offrir aux PME une vitrine numérique moderne, leur permettant de mettre en avant leurs produits et services de manière efficace et accessible.
                    </p>
                    <p className="text-gray-600 mt-4">
                        Notre solution s&apos;appuie sur une fonctionnalité clé : la <strong>géolocalisation</strong>. Grâce à cette technologie, les utilisateurs de notre plateforme peuvent facilement découvrir les produits et services disponibles près de chez eux. 
                        Que ce soit pour trouver un restaurant local, un service de livraison, ou encore un artisan du quartier, notre application permet de connecter les clients aux entreprises de proximité en quelques clics.
                    </p>
                    <p className="text-gray-600 mt-4">
                        Notre mission est de <strong>faciliter l&apos;accès au numérique</strong> pour les PME, tout en favorisant les circuits courts et en rapprochant les commerçants de leurs clients potentiels. 
                        Nous croyons fermement que chaque petite entreprise mérite d&apos;être visible en ligne et de profiter des opportunités offertes par le digital, sans avoir besoin de compétences techniques avancées.
                    </p>
                    <p className="text-gray-600 mt-4">
                        Si vous êtes une entreprise à la recherche d&apos;une solution simple et efficace pour créer votre présence en ligne, ou un utilisateur curieux de découvrir ce qui se trouve autour de vous, notre plateforme est faite pour vous. 
                        Nous sommes là pour vous accompagner dans cette aventure numérique, tout en mettant en avant l&apos;humain et la proximité.
                    </p>
                    <AddCorporation description={"Regnoindre Proximus Prime"} />

               
                    <div className="flex justify-center mt-8">
                        <Image
                            src="/default_image.jpg"  
                            alt="Notre équipe"
                            width={200}  
                            height={200} 
                            className="rounded-full shadow-lg"  // Cercle et ombre
                        />
                        <Image
                            src="/default_image.jpg"  
                            alt="Notre équipe"
                            width={200}  
                            height={200} 
                            className="rounded-full shadow-lg"  // Cercle et ombre
                        />
                        <Image
                            src="/default_image.jpg"  
                            alt="Notre équipe"
                            width={200}  
                            height={200} 
                            className="rounded-full shadow-lg"  // Cercle et ombre
                        />
                        <Image
                            src="/default_image.jpg"  
                            alt="Notre équipe"
                            width={200}  
                            height={200} 
                            className="rounded-full shadow-lg"  // Cercle et ombre
                        />
                    </div>
                    
                </div>
            </section>
        </div>
    );
};

export default HomePage;
