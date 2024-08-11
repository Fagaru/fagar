"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { SideBar } from "@/components/side-bar";
import Header from "@/components/header";
import ProtectedRoute from "@/providers/protectedRoutes";
import { useAuth } from "@/context/authContext";
import toast from "react-hot-toast";
import Loader from "@/components/loader";
// import Loader from "@/components/loader"; // Assurez-vous d'avoir un composant Loader

export default function DashboardLayout({
  children
} : {
  children: React.ReactNode
}) {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
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
      <Header />
      <ProtectedRoute allowedRoles={["admin"]}>
        <div className="flex flex-row">
          <SideBar className=""/>
          <div className="w-full bg-gray-50 dark:bg-slate-900">
            {children}
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
}
