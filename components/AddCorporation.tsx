"use client";

import { Plus } from 'lucide-react';
import { Button } from './ui/button';

import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';
import toast from 'react-hot-toast';
import Loader from '@/components/loader';
import { cn } from "@/lib/utils";

const AddCorporation = () => {
  const storeModal = useStoreModal();
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState<any>(null);

  useEffect(() => {
    const fetchAction= async () => {
        try {
            
            if (user?.role === "professional" || user?.role === "admin") {
                // toast.error('Accès non autorisé');
                setAction(true)
                setLoading(false);
            } else {
                setAction(false)
                setLoading(false);
            }
        } catch (error) {
            toast.error('Erreur lors de la récupération des données');
            console.error(error);
        }
    };

    fetchAction();
  }, [isAuthenticated, user, router]);

  if (loading) {
      return <Loader />; // Affiche un loader pendant la vérification de l'authentification et la récupération des données
  }



  const handleClick = () => {
    if (action) {
      setOpen(false);
      storeModal.onOpen();
    } else {
      toast.error("Veuillez poursuivre avec un compte pro !")
    }
    
  };

  return (
    <div className={cn(`flex items-center border-2 rounded-full`)}>

      <Button className="flex items-center rounded-full border-gray-300 px-4 py-2 text-sm" variant={'destructive'} onClick={handleClick}>
        <Plus size={15} />
          Ajouter votre entreprise
      </Button>
    </div>
  );
};

export default AddCorporation;
