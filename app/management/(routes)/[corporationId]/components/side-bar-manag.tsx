"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Album, AreaChart, BadgeEuro, Home, Menu, Monitor, Package, Palette, Ruler, Settings, PackageCheck, ListTodo, TrendingUp, User, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import getCorporations from "@/services/getCorporations";
import { Corporation } from "@/types/corporation";

export function SideBarManag({
    className,
    setIsOpen
}: any) {
    const { user } = useAuth();
    const pathname = usePathname();
    const [isHidden, setIsHidden] = useState<any>(null);

    const toggleSidebar = () => {
        setIsHidden(!isHidden);
        setIsOpen(isHidden);
    };

    const [corporation, setCorporation] = useState<Corporation>();
    const [error, setError] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const fetchData = async () => {
        try {
            const corps = await getCorporations({userId : user.id});
            console.log("Client : ", corps);

            setCorporation(corps[0]);
        } catch (err) {
            setError("Failed to fetch corporation data");
        }
        };

        fetchData();
    }, [isMounted]);

    if (!isMounted) {
        return null;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {/* Sidebar */}
            <div className={cn(`fixed top-[4rem] left-0 h-[calc(100vh-4rem)] w-64 z-40 bg-white dark:bg-gray-950 transform ${isHidden ? '-translate-x-full' : 'translate-x-0'} transition-transform duration-300 ease-in-out`, className)}>
                <nav className="flex flex-col h-full gap-3 p-3 pt-12 overflow-y-auto">
                    <div className="pl-3">
                        <div className="gap-3 mb-3">
                            <span className="text-xs font-extralight">MAIN</span>
                            <Link
                                key='/management/home'
                                href='/management'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/management/home') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <Home size="20px" />
                                <span className="text-sm">Home</span>
                            </Link>
                            <Link
                                key='/account'
                                href='/account'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/management/profile') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <User size="20px" />
                                <span className="text-sm">Profil</span>
                            </Link>
                            <Link
                                key='/management/settings'
                                href='/management/settings'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/management/settings') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <Settings size="20px" />
                                <span className="text-sm">Settings</span>
                            </Link>
                        </div>
                        <div className="gap-3 mb-3">
                            <span className="text-xs font-extralight">LISTS</span>
                            <Link
                                key={`/management/${corporation?._id}`}
                                href={`/management/${corporation?._id}`}
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === `/management/${corporation?._id}`) ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <PackageCheck size="20px" />
                                <span className="text-sm">Mon entreprise</span>
                            </Link>
                            <Link
                                key='/management/sales'
                                href='/management/sales'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/management/sales') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <BadgeEuro size="20px" />
                                <span className="text-sm">Ventes</span>
                            </Link>
                            <Link
                                key='/management/bookings'
                                href='/management/bookings'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/management/bookings') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <CalendarDays size="20px" />
                                <span className="text-sm">Réservations</span>
                            </Link>
                            <Link
                                key='/management/orders'
                                href='/management/orders'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/management/orders') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <ListTodo size="20px" />
                                <span className="text-sm">Commandes</span>
                            </Link>
                        </div>
                        <div className="gap-3 mb-3">
                            <span className="text-xs font-extralight">ANALYTICS</span>
                            <Link
                                key='/management/charts'
                                href='/management'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/management/charts') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <AreaChart size="20px" />
                                <span className="text-sm">Charts</span>
                            </Link>
                            <Link
                                key='/management/activity'
                                href='/management'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/management/activity') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <Monitor size="20px" />
                                <span className="text-sm">Activity monitoring</span>
                            </Link>
                        </div>
                        <div className="gap-3 mb-3">
                            <span className="text-xs font-extralight">FORMULE</span>
                            <Link
                                key='/management/subscriptions'
                                href='/management/subscriptions'
                                className={cn(
                                    "flex items-center gap-5 m-1 p-3 rounded-md transition-colors hover:bg-green-100 dark:hover:bg-green-800",
                                    (pathname === '/management/subscriptions') ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-white font-medium" : ""
                                )}
                            >
                                <TrendingUp size="20px" />
                                <span className="text-sm">Compte {user?.role}</span>
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