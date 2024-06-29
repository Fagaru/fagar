import { redirect } from "next/navigation";

import dbConnect from '../../lib/dbConnect';

interface UserData {
    id: string
    name: string
    isAuthenticated: boolean
    isVisitor: boolean
    isAdmin: boolean
    isMerchant: boolean
    isDriver: boolean
    isCustomer: boolean
};

export default async function SetupLayout({
   children,
} : {
    children: React.ReactNode;
}) {
    await dbConnect();
    // const { userId } = auth();
    const user: UserData = {
        id: "1234",
        name: "Sam",
        isAdmin: false,
        isAuthenticated: false,
        isVisitor: false,
        isMerchant: false,
        isDriver: false,
        isCustomer: false,
    };

    // if (!userId) {
    //     redirect('/sign-in');
    // }

    if (user.isAuthenticated) { 
        // Rediriger l'utilisateur visiteur vers la page d'accueil
        if (user.isVisitor) {
            redirect(`/`);
        }

        // Rediriger l'utilisateur admin vers la page de son entreprise
        if (user.isAdmin) {
            // redirect(`/management/${corporation.id}`);
        }
    } else {
        // Rediriger l'utilisateur anonyme vers l'accueil
    // Lecture
        redirect(`/`);
    }

    return (
        <>
            {children}
        </>
    );
};