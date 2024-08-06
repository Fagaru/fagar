
import { redirect } from "next/navigation";

import dbConnect from '@/lib/dbConnect';
import Corporation from '@/models/corporation.model';

import { SideBar } from "@/components/side-bar";
import Header from "@/components/header";
import Container from "@/components/ui/container";
import Footer from "@/components/footer";


export default async function AccountLayout({
   children
} : {
    children: React.ReactNode;
}) {

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