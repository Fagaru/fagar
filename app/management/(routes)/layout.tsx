"use client";

import { useEffect, useState } from "react";

import Header from "@/components/header";
import Container from "@/components/ui/container";
import { useAuth } from "@/context/authContext";
import ProtectedRoute from "@/providers/protectedRoutes";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/loader";

import {SideBarManag} from "./[corporationId]/components/side-bar-manag";


export default function ManagementLayout({
   children
} : {
    children: React.ReactNode;
}) {
    const { isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        if (isAuthenticated === false) {
            toast.error('Veuillez vous authentifier pour poursuivre !');
            router.push('/auth?tab=login')
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, router]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
        <div className="bg-gray-50 dark:bg-slate-950 pt-10">
            <Header />
            <Container>
                <ProtectedRoute allowedRoles={['admin', 'professional']}>
                <div className="flex flex-1 overflow-hidden pt-10">
                    {/* Sidebar */}
                    <SideBarManag setIsOpen={setIsOpen} />
                    <main
                        className={`transition-all duration-300 ease-in-out overflow-auto bg-gray-50 dark:bg-gray-950`}
                        style={{
                            width: isOpen ? "calc(100% - 16rem)" : "100%",
                            marginLeft: isOpen ? "16rem" : "0",
                        }}
                    >
                        {children}
                    </main>
                    </div>
                </ProtectedRoute>
            </Container>
        </div>
        </>
    );
}