
import { redirect } from "next/navigation";


import { SideBar } from "@/components/side-bar";
import Header from "@/components/header";


export default async function DashboardLayout({
   children
} : {
    children: React.ReactNode
}) {
    // const { userId } = auth();
    const userId = "1234";

    // if (!userId) {
    //     redirect('/sign-in');
    // }

    

    return (
        <>
            <Header />
            <div className="flex flex-row">
                <SideBar className=""/>
                <div className="w-full bg-gray-50 dark:bg-slate-900">
                    {children}
                </div>
            </div>
        </>
    );
}