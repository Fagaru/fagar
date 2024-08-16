"use client";

import { LoginForm } from "../login/components/login-form";
import { RegisterForm } from "../register/components/register-form";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from 'next/navigation';

const AuthPage = () => {
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab'); // Lire le paramètre 'tab' de l'URL

    const role = searchParams.get('role');
    
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-xl">
                <Tabs defaultValue={tab === 'login' ? 'login' : 'register'} className="w-full">
                    <TabsList className="grid grid-cols-2 w-full">
                        <TabsTrigger value="login">Connexion</TabsTrigger>
                        <TabsTrigger value="register">Inscription</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <LoginForm />
                    </TabsContent>
                    { role ?
                        <>
                            <TabsContent value="register">
                                <RegisterForm role={role}/>
                            </TabsContent>
                        </>
                        :
                        <TabsContent value="register">
                            <RegisterForm role="visitor"/>
                        </TabsContent>

                    }
                </Tabs>      
            </div>
        </div>
    );
};

export default AuthPage;
