"use client";

import { useEffect, useState } from "react";

import Header from "@/components/header";
import Container from "@/components/ui/container";
import { useAuth } from "@/context/authContext";
import ProtectedRoute from "@/providers/protectedRoutes";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/loader";


export default function ManagementLayout({
   children
} : {
    children: React.ReactNode;
}) {
    const { user, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // setLoading(true);
        if (isAuthenticated === false) {
            toast.error('Veuillez vous authentifier pour poursuivre !');
            router.push('/login');
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, router]);

    if (loading) {
        return <Loader />; // Affiche un loader pendant la vérification de l'authentification
    }

    return (
        <>
        <div className="bg-gray-50 dark:bg-slate-950">
            <Header />
            <Container>
                <ProtectedRoute allowedRoles={['admin', 'professional']}>
                <div className="flex flex-row">
                    <div className="w-full">
                        {children}
                    </div>
                </div>
                </ProtectedRoute>
            </Container>
        </div>
        </>
    );
}