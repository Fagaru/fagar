"use client";
import { CorporationForm } from "./components/corporation-form";
import getCorporation from "@/services/getCorporation";
import getCategories from "@/services/getCategories";
import { useAuth } from "@/context/authContext";
import toast from "react-hot-toast";
import { redirect, useParams, useRouter } from "next/navigation";
import Loader from "@/components/loader";
import { useEffect, useState } from "react";


interface ManagementPageProps {
    params: {corporationId: string}
};

const ManagementPage: React.FC<ManagementPageProps> = ({
    params
}) => {
    const { user, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);
    const [corporation, setCorporation] = useState<any>(null);
    const [categories, setCategories] = useState<any>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const corporationData = await getCorporation({ corporationId: params.corporationId });
                const categoriesData = await getCategories();
                
                if (corporationData.userId !== user?.id && user.role !== "admin") {
                    toast.error('Accès non autorisé');
                    router.push('/unauthorized');
                } else {
                    setCorporation(corporationData);
                    setCategories(categoriesData);
                    setLoading(false);
                }
            } catch (error) {
                toast.error('Erreur lors de la récupération des données');
                console.error(error);
            }
        };

        if (isAuthenticated && user) {
            fetchData();
        } else {
            setLoading(true);
            router.push('/login');
        }
    }, [isAuthenticated, user, params.corporationId, router]);

    if (loading) {
        return <Loader />; // Affiche un loader pendant la vérification de l'authentification et la récupération des données
    }
    return (
        <div className="items-center">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CorporationForm initialData={corporation} categories={categories} />
            </div>
        </div>
    );
}

export default ManagementPage;