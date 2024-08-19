"use client";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import UserAccount from "@/components/user-account";
import FagarLogo from "@/components/fagarLogo";
import SearchBar from "@/components/searchBar";
import AddCorporation from "./AddCorporation";
import { Menu, X } from "lucide-react";
import MenuUnsignedUser from "./menu-unsigned";

const Header = () => {

    return (
        <div>
            {/* Conteneur principal du header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-b pb-10 h-16">
                <div className="flex items-center justify-between h-16 p-4">
                    {/* Logo et nom du site */}
                    <div className="flex items-center">
                        <FagarLogo />
                        <span className="text-lg font-medium text-baguet italic text-rose-600 ml-2">
                            Fagar
                        </span>
                    </div>

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
        </div>
    );
};

export default Header;
