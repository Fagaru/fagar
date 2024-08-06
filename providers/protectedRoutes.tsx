"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import toast from 'react-hot-toast';

interface ProtectedRoutesProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRoutesProps> = ({ 
  allowedRoles, 
  children 
}) => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (isAuthenticated === false) {
      toast.error('Veuillez vous authentifier pour poursuivre !');
      router.push('/login');
    } else if (user && !allowedRoles.includes(user.role)) {
      toast.error('Accès non autorisé !');
      router.push('/unauthorized');
    } else {
      setLoading(false);
    }
  }, [user, isAuthenticated, router, allowedRoles]);

  if (loading) {
    return null; // Affiche un loader pendant la vérification de l'accès
  }

  return <>{children}</>; // Affiche les enfants une fois la vérification terminée
};

export default ProtectedRoute;
