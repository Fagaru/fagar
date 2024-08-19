"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { SideBar } from "@/components/side-bar";
import Header from "@/components/header";
import ProtectedRoute from "@/providers/protectedRoutes";
import { useAuth } from "@/context/authContext";
import toast from "react-hot-toast";
import Loader from "@/components/loader";

export default function DashboardLayout({
  children
} : {
  children: React.ReactNode
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
  console.log("IsOpen", isOpen);

  return (
    <>
      <Header />
      <ProtectedRoute allowedRoles={["admin"]}>
        <div className="flex flex-1 overflow-hidden pt-10">
          {/* Sidebar */}
          <SideBar setIsOpen={setIsOpen} />
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
    </>
  );
}
