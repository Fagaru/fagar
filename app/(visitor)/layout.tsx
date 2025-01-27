
import { redirect } from "next/navigation";

import { SideBar } from "@/components/side-bar";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Snowfall from "@/components/snowfall";
import { Suspense } from 'react';


export default async function VisitorLayout({
   children
} : {
    children: React.ReactNode;
}) {

    return (
        <>
            <div className="bg-gray-50 dark:bg-slate-950">
                <Snowfall 
                    snowflakeCount={400} 
                    color="lightblue" 
                    sizeRange={[5, 15]} 
                    speedRange={[5, 15]} 
                />
                <div className="w-full">
                <Suspense >
                    {children}
                </Suspense>
                </div>
            </div> 
        </>
    );
}