
import { redirect } from "next/navigation";

import { SideBar } from "@/components/side-bar";
import HeaderWelcome from "@/components/headerWelcome";
import Container from "@/components/ui/container";
import Footer from  "@/components/footerWelcome"





export default async function DashboardLayout({
   children
} : {
    children: React.ReactNode;
}) {

    return (
        <>
            <div className="min-h-screen">
            <HeaderWelcome />
            <main>{children}</main>
            <Footer />
            </div>
        </>
    );
}