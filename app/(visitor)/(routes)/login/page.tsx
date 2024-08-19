import toast from "react-hot-toast";
import { LoginForm } from "./components/login-form";

const LoginPage = () => {
    
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
