"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import FagarLogo from "@/components/fagarLogo";
// import SearchBar from "@/components/searchBar";
import AddCorporation from "./AddCorporation";
import MenuUnsignedUser from "./menu-unsigned";
// import MapBoxApiKeyWrapper from "@/providers/map-box-apikey-wrapper";
import dynamic from 'next/dynamic'
 
// const NoSSR = dynamic(() => import('@/providers/map-box-apikey-wrapper'), { ssr: false })
 

     
const links=["Notre concept", "Le blog", "Nous contacter"]
const HeaderWelcome = () => {
    return (
        // <header>
        //     {/* Conteneur principal du header */}
        //     <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-b h-16">
        //         <div className="flex items-center justify-between h-16 p-4">
        //             {/* Logo et nom du site */}
        //             <div className="flex items-center">
        //                 <FagarLogo />
        //                 <span className="text-lg font-medium text-baguet text-rose-600 ml-2">
        //                     Proximus Prime
        //                 </span>
        //             </div>

        //             {/* <NoSSR /> */}
        //             {/* SearchBar cachée sur mobile */}
        //             {/* <div className="flex-1 justify-center hidden md:flex">
        //                 <SearchBar />
        //             </div> */}
        //             <div className="gap-10">
        //             <ul className="flex gap-6 list-none">
        //                 {links.map((link)=> (
        //                     <li key={link}>
        //                         <a href="#">{link}</a>
        //                     </li>
        //                 ))}
        //             </ul>
        //             </div>
       
        //         </div>

        //         {/* SearchBar fixe et seule sur une ligne pour les petits écrans */}
        //         {/* <div className="md:hidden top-16 left-0 right-0 bg-white dark:bg-gray-950 px-4 py-2 border-t z-50 h-14">
        //             <SearchBar />
        //         </div> */}
        //     </div>
        //     {/* Ajout d'une marge pour le contenu principal */}
        //     <div className="mt-16 md:mt-0">
        //         {/* Ici commence le contenu principal de la page */}
        //     </div>
        // </header>
        <header className=" bg-white shadow">
            <div className=" left-0 right-0 z-50 bg-white dark:bg-gray-950 border-b h-16">
        <nav className="max-w-10xl mx-auto flex justify-between items-center p-4">
          {/* Logo et nom du site */}
                   <div className="flex items-center">
                      <FagarLogo />
                      <span className="text-lg font-medium text-baguet text-rose-600 ml-2">
                           Proximus Prime
                      </span>
                     </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-600">Notre concept</a>
            <a href="#" className="text-gray-600">Le blog</a>
            <a href="#" className="text-gray-600">Nous contacter</a>
                         {/* Actions à droite */}
                   <div className="ml-auto flex items-center space-x-4">
                        {/* Affiché sur les
                         écrans md et plus */}
                        <div className="hidden md:flex items-center space-x-4">
                            <AddCorporation description={'Ajouter votre entreprise'} />
                         <ThemeToggle />
                             <MenuUnsignedUser />
                        </div>

                         {/* Affiché uniquement sur les petits écrans */}
                         <div className="md:hidden flex items-center space-x-4">
                             <ThemeToggle />
                             <MenuUnsignedUser />
                        </div>
                     </div>
            <div className="relative">
            </div>
          </div>
        </nav>
        </div>
      </header>

    );
};

export default HeaderWelcome;