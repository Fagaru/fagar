
import { redirect } from "next/navigation";

import dbConnect from '@/lib/dbConnect';
import Corporation from '@/models/corporation.model';

import { SideBar } from "@/components/side-bar";
import Header from "@/components/header";
import Container from "@/components/ui/container";


export default async function PROSLayout({
   children
} : {
    children: React.ReactNode;
}) {

    return (
        <>
        <div className="bg-gray-50 dark:bg-gray-950">
            <Container>
                <Header />
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