import axios from 'axios';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const useAxiosWithAuth = () => {
    const { token, checkTokenExp, logout } = useAuth();
    const router = useRouter();
        
    const instance = axios.create();

    // Interceptor to add token to requests
    instance.interceptors.request.use(
        (config) => {
            checkTokenExp(); // Ensure the token is valid
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
        return Promise.reject(error);
        }
    );

    // Optionally handle responses and errors globally
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status === 401) {
                logout();
                toast.error('Votre connexion a expiré. Veuillez vous authentifier !');
                router.push('/login')
            // Handle unauthorized errors, e.g., redirect to login
            }
        return Promise.reject(error);
        }
    );

    return instance;
};

export default useAxiosWithAuth;
