"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import FagarLogo from "@/components/fagarLogo";
import SearchBar from "@/components/searchBar";
import AddCorporation from "./AddCorporation";
import MenuUnsignedUser from "./menu-unsigned";
import MapBoxApiKeyWrapper from "@/providers/map-box-apikey-wrapper";
import dynamic from 'next/dynamic'
 
const NoSSR = dynamic(() => import('@/providers/map-box-apikey-wrapper'), { ssr: false })
 

     

const Header = () => {
    return (
        <header>
            {/* Conteneur principal du header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-b h-16">
                <div className="flex items-center justify-between h-16 p-4">
                    {/* Logo et nom du site */}
                    <div className="flex items-center">
                        <FagarLogo />
                        <span className="text-lg font-medium text-baguet text-rose-600 ml-2">
                            Proximus Prime
                        </span>
                    </div>
                    <NoSSR />
                    {/* SearchBar cachée sur mobile */}
                    <div className="flex-1 justify-center hidden md:flex">
                        <SearchBar />
                    </div>

                    {/* Actions à droite */}
                    <div className="ml-auto flex items-center space-x-4">
                        {/* Affiché sur les écrans md et plus */}
                        <div className="hidden md:flex items-center space-x-4">
                            <AddCorporation />
                            <ThemeToggle />
                            <MenuUnsignedUser />
                        </div>

                        {/* Affiché uniquement sur les petits écrans */}
                        <div className="md:hidden flex items-center space-x-4">
                            <ThemeToggle />
                            <MenuUnsignedUser />
                        </div>
                    </div>
                </div>

                {/* SearchBar fixe et seule sur une ligne pour les petits écrans */}
                <div className="md:hidden top-16 left-0 right-0 bg-white dark:bg-gray-950 px-4 py-2 border-t z-50 h-14">
                    <SearchBar />
                </div>
            </div>
            {/* Ajout d'une marge pour le contenu principal */}
            <div className="mt-16 md:mt-0">
                {/* Ici commence le contenu principal de la page */}
            </div>
        </header>
    );
};

export default Header;