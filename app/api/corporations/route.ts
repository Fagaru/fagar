// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Corporation from '@/models/corporation.model';
import User, { ROLES } from "@/models/user.model";
import { withAuth } from "@/lib/auth";

// Types d'utilisateurs autorisés
const allowedRolesForPOST = ['admin', 'professional'];
const allowedRolesForGET = ['admin', 'professional', 'visitor', 'anonymous'];

interface AuthenticatedRequest extends Request {
    user?: any;
}

export async function POST(
    req: Request,
) {
    try {

        // Vérifiez l'authentification et les rôles
        const authResponse = await withAuth(['admin', 'professional'], req);
        if (authResponse) return authResponse;
        
        const body = await req.json();

        const {
            name, userId, phone, mail_pro, description, siretNum, siren_num, codeNAF, linkFacebook, linkInstagram, linkLinkedIn, linkX,
            starting_date, numEmplyees, address, categoryId, tags, images, schedules
        } = body;

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
            tags,   // Embedded tags
            images, // Embedded images
            schedules // Embedded schedules
        });

        await corporation.save();
        return NextResponse.json(corporation);
    } catch (error) {
        console.log('[CORPORATION_POST] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {
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