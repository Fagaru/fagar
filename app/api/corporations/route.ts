// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Corporation from '@/models/corporation.model';

export async function POST(
    req: Request,
) {
    try {
        // const { userId } = auth();
        // const userId = "1234";
        const body = await req.json();

        const {
            name, userId, phone, mail_pro, description, siretNum, siren_num, codeNAF, linkFacebook, linkInstagram, linkLinkedIn, linkX,
            starting_date, numEmplyees, address, categoryId, tags, images, schedules
        } = body;

        console.log("[USERID] ", userId);

        // if (!userId) {
        //     return new NextResponse("Unauthenticated", { status: 401 });
        // }

        if (!name) {
            return new NextResponse("Name is required", {  status: 400});
        }

        await dbConnect();
        const corporation = new Corporation({
            name,
            userId,
            phone,
            mail_pro,
            description,
            siretNum,
            siren_num,
            codeNAF,
            linkFacebook,
            linkInstagram,
            linkLinkedIn,
            linkX,
            starting_date,
            numEmplyees,
            address, // Embedded address
            categoryId,
            tags,
            images, // Embedded images
            schedules // Embedded schedules
        });

        await corporation.save();
        return NextResponse.json(corporation);
    } catch (error) {
        console.log('[CORPORATIONS_POST] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {
        // const stores = await prismadb.store.findMany({});
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        const tags = searchParams.get("tags") || undefined;
        const cityId = searchParams.get("cityId") || undefined;
        const regionId = searchParams.get("regionId") || undefined;
        // Construire la requête de recherche
        const query: any = {};

        // Filtrer par catégorie (ID de la catégorie)
        if (categoryId) {
            query.categoryId = categoryId;
        }

        // Filtrer par tags (nom des tags)
        if (tags && tags.length > 0) {
            query.tags = { $in: tags };
        }

        // Filtrer par cityId
        if (cityId) {
            query['address.cityId'] = cityId;
        }
    
        // Filtrer par regionId
        if (regionId) {
            query['address.regionId'] = regionId;
        }

        await dbConnect();
        // const corporations = await Corporation.find({});
        // res.status(200).json(corporations);
        // Exécuter la requête de recherche
        const corporations = await Corporation.find(query)
        .populate('categoryId') // Peupler la catégorie (si vous avez un modèle Category)
        .populate('address.cityId') // Peupler la ville
        .populate('address.regionId') // Peupler la région
        .exec();

        console.log('Corporations trouvées:', corporations);
        return NextResponse.json(corporations);
    } catch (error) {
        console.log('[CORPORATIONS_GET] ', error);
        return new NextResponse("Internal error : Erreur lors de la recherche des corporations:", { status: 500 });
    }
}