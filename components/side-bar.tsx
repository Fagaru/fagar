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
    const [isHide, setIsHide] = useState<any>({one: "hidden lg:flex", two:"lg:hidden"});
    const [screenSize, setScreenSize] = useState<any>({
        width: 0
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setScreenSize({ width: window.innerWidth });

            const handleResize = () => {
                setScreenSize({ width: window.innerWidth });
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    const showSideBar = () => {
        if (screenSize.width > 1500 && isHide.one === "hidden lg:flex") {
            setIsHide({ one: "hidden", two: "" });
            setIsOpen(false);
        } else if (screenSize.width < 1500 && screenSize.width >= 300 && isHide.one === "hidden lg:flex") {
            setIsHide({ one: "", two: "hidden" });
            setIsOpen(true);
        }else if (screenSize.width < 1024 && screenSize.width < 300 && isHide.one === "hidden lg:flex") {
            setIsHide({ one: "", two: "hidden" });
            setIsOpen(true);
        } else {
            if (isHide.one === "hidden" || isHide.two === "") {
                setIsHide({ one: "", two: "hidden" });
                setIsOpen(false);
            } else {
                setIsHide({ one: "hidden", two: "" });
                setIsOpen(false);
            }
        }
    };

    return (
        <>
            <div className={cn(`w-[255px] ${isHide.one}`)}>
                <nav
                    className={cn(`flex flex-col gap-3 w-[230px] border-solid border-r-[2px] p-1 ${isHide.one} `, className)}
                    ref={navRef}
                >
                    <Button variant="ghost" size="sm" className="w-[100px] gap-3" onClick={showSideBar} >
                        <Menu />
                        <span className="text-sm/[30px]">Fagar</span>
                    </Button>
                    <div className="pl-5">
                        <div className="gap-3 mb-3">
                            <span className="text-xs font-extralight">MAIN</span>
                            <Link 
                                key='/dashboard/home'
                                href='/dashboard/home'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-[10px] rounded-[5px] transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard/home') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <Home size="20px" />
                                <span className="text-sm/[20px]">Home</span>
                            </Link>
                            <Link 
                                key='/dashboard/profile'
                                href='/dashboard'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-[10px] rounded-[5px] transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <User size="20px" />
                                <span className="text-sm/[20px]">Profile</span>
                            </Link>
                            <Link 
                                key='/dashboard/Settings'
                                href='/dashboard/settings'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-[10px] rounded-[5px] transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard/settings') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <Settings size="20px" />
                                <span className="text-sm/[20px]">Settings</span>
                            </Link>
                        </div>
                        <div className="gap-3 mb-3">
                            <span className="text-xs font-extralight">LISTS</span>
                            <Link 
                                key='/dashboard/corporations'
                                href='/dashboard/corporations'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-[10px] rounded-[5px] transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard/corporations') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <ShoppingCart size="20px" />
                                <span className="text-sm/[20px]">Entreprises</span>
                            </Link>
                            <Link 
                                key='/dashboard/categories'
                                href='/dashboard/categories'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-[10px] rounded-[5px] transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard/categories') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <Package size="20px" />
                                <span className="text-sm/[20px]">Categories</span>
                            </Link>
                            <Link 
                                key='/dashboard/cities'
                                href='/dashboard/cities'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-[10px] rounded-[5px] transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard/cities') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <Target size="20px" />
                                <span className="text-sm/[20px]">Villes</span>
                            </Link>
                            <Link 
                                key='/dashboard/regions'
                                href='/dashboard/regions'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-[10px] rounded-[5px] transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard/regions') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <Album size="20px" />
                                <span className="text-sm/[20px]">Régions</span>
                            </Link>
                            <Link 
                                key='/dashboard/users'
                                href='/dashboard/users'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-[10px] rounded-[5px] transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard/users') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <Ruler size="20px" />
                                <span className="text-sm/[20px]">Utilisateurs</span>
                            </Link>
                        </div>
                        <div className="gap-3 mb-3">
                            <span className="text-xs font-extralight">ANALYTICS</span>
                            <Link 
                                key='/dashboard/charts'
                                href='/dashboard'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-[10px] rounded-[5px] transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <AreaChart size="20px" />
                                <span className="text-sm/[20px]">Charts</span>
                            </Link>
                            <Link 
                                key='/dashboard/activity'
                                href='/dashboard'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-[10px] rounded-[5px] transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <Monitor size="20px" />
                                <span className="text-sm/[20px]">Activity monitoring</span>
                            </Link>
                        </div>
                        <div className="gap-3 mb-3">
                            <span className="text-xs font-extralight">PRO</span>
                            <Link 
                                key='/dashboard/subscriptions'
                                href='/dashboard/subscriptions'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-[10px] rounded-[5px] transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/dashboard/subscriptions') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <TrendingUp size="20px" />
                                <span className="text-sm/[20px]">Nos offres</span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
            <Button variant="ghost" size="sm" onClick={showSideBar} className={cn(`${isHide.two} m-1 transition-all duration-500`, className)}>
                    <Menu />
            </Button>
        </>
    )
};
