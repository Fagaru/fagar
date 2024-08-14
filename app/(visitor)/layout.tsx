
import { redirect } from "next/navigation";

import { SideBar } from "@/components/side-bar";
import Header from "@/components/header";
import Footer from "@/components/footer";


export default async function VisitorLayout({
   children
} : {
    children: React.ReactNode;
}) {

    return (
        <>
            <div className="bg-gray-50 dark:bg-slate-950">
                <div className="w-full">
                    {children}
                </div>
            </div> 
        </>
    );
}