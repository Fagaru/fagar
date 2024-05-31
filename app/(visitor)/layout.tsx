
import { redirect } from "next/navigation";

import { MongoClient } from 'mongodb';
import prismadb from "@/lib/prismadb";
import prisma from '@/lib/prisma';

import dbConnect from '../../lib/dbConnect';
import Corporation from '@/models/corporation.model';

import Navbar from "@/components/navbar";
import { InBoxProvider } from "@/providers/inbox-provider";
import { SideBar } from "@/components/side-bar";


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

    
    // const corporation = await prismadb.corporation.findFirst({
    //     where: {
    //         id: params.corporationId,
    //         userId
    //     }
    // });

    // const createFisrt = await prisma?.subscription.create({
    //     data: {
    //       label: 'default',
    //       description: 'test',
    //       price: '30'
    //     },
    //   })
    // console.log(createFisrt)
    // const corporation = new Corporation({
    //     name,
    //     userId,
    //     phone,
    //     mail_pro,
    //     description,
    //     siretNum,
    //     siren_num,
    //     codeNAF,
    //     linkFacebook,
    //     linkInstagram,
    //     linkLinkedIn,
    //     linkX,
    //     starting_date,
    //     numEmplyees,
    //     address, // Embedded address
    //     categoryId,
    //     tags,
    //     images, // Embedded images
    //     schedules, // Embedded schedules
    //     reviews, // Embedded reviews
    //     subscription, // Embedded subscription
    //     isActive,
    //     isSuspended
    // });


    // const client = new MongoClient(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const name = 'First Corporation'
    const description = 'Default Description'
    // const price = '0.00'
    
    // try {
    //     await client.connect();
    //     const db = client.db(process.env.DATABASE_NAME);
    //     const collection = db.collection('subscription');
    //     const result = await collection.insertOne({
    //       label,
    //       description,
    //       price,
    //       createdAt: new Date(),
    //       updatedAt: new Date()
    //     });
    //     console.log(result.ops[0]);
    // } catch (error:any) {
    //     console.log(error.message);
    // } finally {
    //     await client.close();
    // }

    const corporation = new Corporation({
        name,
        description
    })

    await corporation.save();
    console.log(corporation);

    if (!corporation) {
        redirect('/home');
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