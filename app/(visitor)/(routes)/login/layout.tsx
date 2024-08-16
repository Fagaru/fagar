"use client";

import Header from "@/components/header";

export default function LoginLayout({
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