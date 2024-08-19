import axios from 'axios';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const useAxiosWithAuth = () => {
    const { token, checkTokenExp, logout } = useAuth();
    const router = useRouter();
    
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL, // Assurez-vous que l'URL de base est bien configurée
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
    });

    // Intercepteur pour ajouter le token aux requêtes
    instance.interceptors.request.use(
        (config) => {
            checkTokenExp(); // Vérifie si le token est toujours valide
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Gérer les réponses et les erreurs globalement
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                logout();
                toast.error('Votre connexion a expiré. Veuillez vous authentifier !');
                router.push('/auth?tab=login');
                // Gérer les erreurs d'authentification, par ex., rediriger vers la page de connexion
            } else if (error.message === 'Network Error') {
                toast.error('Erreur réseau, vérifiez votre connexion internet.');
            } else {
                toast.error('Une erreur est survenue, veuillez réessayer.');
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

export default useAxiosWithAuth;