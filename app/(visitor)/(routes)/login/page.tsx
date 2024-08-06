import toast from "react-hot-toast";
import { LoginForm } from "./components/login-form";

import { useAuth } from "@/context/authContext";

const LoginPage = () => {
    // const { user, isAuthenticated } = useAuth();
    
    // if (isAuthenticated) {
    //     toast.success('Vous êtes déjà connecté');
    //     router.push('/login');
    // }
    
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
