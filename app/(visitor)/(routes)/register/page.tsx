
import { RegisterForm } from "./components/register-form";
import { ROLES } from "@/models/user.model";

const RegisterPage = async () => {
    const role = ROLES.ADMIN;

    return (
        <div className="flex-col p-4">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <RegisterForm role={role} />
            </div>
        </div>
    );
}

export default RegisterPage;