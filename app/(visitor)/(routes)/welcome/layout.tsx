
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
    // const { userId } = auth();
    const userId = "1234";

    // if (!userId) {
    //     redirect('/sign-in');
    // }

    // redirect('/');

    return (
        <>
    <div className="min-h-screen bg-gray-50">
     <HeaderWelcome />
      <main>{children}</main>
      <Footer />
    </div>
           
            
            
       
        </>
    );
}