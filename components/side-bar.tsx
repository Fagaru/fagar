"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Album, AreaChart, Home, Menu, Monitor, Package, Palette, Ruler, Settings, ShoppingCart, Target, TrendingUp, User } from "lucide-react";
import { Button } from "./ui/button";

export function SideBar({
    className,
    setIsOpen
}: any) {
    const pathname = usePathname();
    const params = useParams();
    const navRef = useRef<any>();
    const [isHidden, setIsHidden] = useState<any>(null);

    const toggleSidebar = () => {
        setIsHidden(!isHidden);
        setIsOpen(isHidden);
    };

    return (
        <>
            {/* Sidebar */}
            <div className={cn(`fixed top-[4rem] left-0 h-[calc(100vh-4rem)] w-64 z-40 bg-white dark:bg-gray-950 transform ${isHidden ? '-translate-x-full' : 'translate-x-0'} transition-transform duration-300 ease-in-out`, className)}>
                <nav className="flex flex-col h-full gap-3 p-3 pt-12 overflow-y-auto">
                    <div className="pl-3">
                        <div className="gap-3 mb-3">
                            <span className="text-xs font-extralight">MAIN</span>
                            <Link
                                key='/dashboard/home'
                                href='/dashboard/home'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard/home') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <Home size="20px" />
                                <span className="text-sm">Home</span>
                            </Link>
                            <Link
                                key='/dashboard/profile'
                                href='/dashboard/profile'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard/profile') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <User size="20px" />
                                <span className="text-sm">Profile</span>
                            </Link>
                            <Link
                                key='/dashboard/settings'
                                href='/dashboard/settings'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard/settings') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <Settings size="20px" />
                                <span className="text-sm">Settings</span>
                            </Link>
                        </div>
                        <div className="gap-3 mb-3">
                            <span className="text-xs font-extralight">LISTS</span>
                            <Link
                                key='/dashboard/corporations'
                                href='/dashboard/corporations'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard/corporations') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <ShoppingCart size="20px" />
                                <span className="text-sm">Entreprises</span>
                            </Link>
                            <Link
                                key='/dashboard/categories'
                                href='/dashboard/categories'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard/categories') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <Package size="20px" />
                                <span className="text-sm">Categories</span>
                            </Link>
                            <Link
                                key='/dashboard/cities'
                                href='/dashboard/cities'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard/cities') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <Target size="20px" />
                                <span className="text-sm">Villes</span>
                            </Link>
                            <Link
                                key='/dashboard/regions'
                                href='/dashboard/regions'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard/regions') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <Album size="20px" />
                                <span className="text-sm">Régions</span>
                            </Link>
                            <Link
                                key='/dashboard/users'
                                href='/dashboard/users'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard/users') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <Ruler size="20px" />
                                <span className="text-sm">Utilisateurs</span>
                            </Link>
                        </div>
                        <div className="gap-3 mb-3">
                            <span className="text-xs font-extralight">ANALYTICS</span>
                            <Link
                                key='/dashboard/charts'
                                href='/dashboard'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard/charts') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <AreaChart size="20px" />
                                <span className="text-sm">Charts</span>
                            </Link>
                            <Link
                                key='/dashboard/activity'
                                href='/dashboard'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard/activity') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <Monitor size="20px" />
                                <span className="text-sm">Activity monitoring</span>
                            </Link>
                        </div>
                        <div className="gap-3 mb-3">
                            <span className="text-xs font-extralight">PRO</span>
                            <Link
                                key='/dashboard/subscriptions'
                                href='/dashboard/subscriptions'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard/subscriptions') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <TrendingUp size="20px" />
                                <span className="text-sm">Nos offres</span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Button to toggle sidebar */}
            <Button variant="ghost" size="sm" onClick={toggleSidebar} className={cn(`fixed top-20 left-2 lg:block z-50 transition-all duration-500`, className)}>
                <Menu />
            </Button>
        </>
    );
}