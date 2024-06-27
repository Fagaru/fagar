
import { redirect } from "next/navigation";

// import { MongoClient } from 'mongodb';


import dbConnect from '../../lib/dbConnect';
import Corporation from '@/models/corporation.model';

import { SideBar } from "@/components/side-bar";
import Header from "@/components/header";
import Container from "@/components/ui/container";


export default async function DashboardLayout({
   children
} : {
    children: React.ReactNode;
}) {
    // const { userId } = auth();
    const userId = "1234";

    // if (!userId) {
    //     redirect('/sign-in');
    // }


    // if (!corporation) {
    //     redirect('/home');
    // }

    // redirect('/');

    return (
        <>
        <div className="bg-gray-50 dark:bg-slate-950">
            <Header />
            <Container>
                <div className="flex flex-row">
                    <div className="w-full">
                        {children}
                    </div>
                </div>
            </Container>
        </div>
        </>
    );
}