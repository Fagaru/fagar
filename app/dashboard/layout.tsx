
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";
import { InBoxProvider } from "@/providers/inbox-provider";
import { SideBar } from "@/components/side-bar";
import { GoogleApiProvider } from "@/providers/googleApi-provider";


export default async function DashboardLayout({
   children,
   params 
} : {
    children: React.ReactNode;
    params: {corporationId: string}
}) {
    // const { userId } = auth();
    const userId = "1234";

    // if (!userId) {
    //     redirect('/sign-in');
    // }

    
    const corporation = await prismadb.corporation.findFirst({
        where: {
            id: params.corporationId,
            userId
        }
    });

    if (!corporation) {
        redirect('/');
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-row">
                <SideBar className=""/>
                <div className="w-full bg-gray-50 dark:bg-slate-900">
                    {children}
                    <InBoxProvider params={params} />
                </div>
            </div>
        </>
    );
}