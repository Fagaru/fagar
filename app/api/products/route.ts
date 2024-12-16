// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import User, { ROLES } from "@/models/user.model";
import { withAuth } from "@/lib/auth";
import { createCorsResponse } from "@/lib/createCorsResponse";
import Product from "@/models/product.model";

// Types d'utilisateurs autorisés
const allowedRolesForPOST = ['admin', 'professional'];
//const allowedRolesForGET = ['admin', 'professional', 'visitor', 'anonymous'];

interface AuthenticatedRequest extends Request {
    user?: any;
}

export async function POST(
    req: Request,
) {
    try {

        // Vérifiez l'authentification et les rôles
        const authResponse = await withAuth(allowedRolesForPOST, req);
        if (authResponse) return authResponse;
        
        const body = await req.json();

        const {
            psin,
            title,
            description,
            mainImage,
            category,
            createdByVendorId,
            status,
            features
        } = body;

        if (!psin) {
            return createCorsResponse("psin is required", {  status: 400});
        }

        await dbConnect();
        const product = new Product({
            psin,
            title,
            description,
            mainImage,
            category,
            createdByVendorId,
            status,
            features
        });

        await product.save();
        return createCorsResponse(product);
    } catch (error) {
        console.log('[New product created] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        const psin = searchParams.get("psin") || undefined;
        // const tags = searchParams.get("tags") || undefined;
        const corporationId = searchParams.get("createdByVendorId") || undefined;
        const features = searchParams.get("features") || undefined;
        // Construire la requête de recherche
        const query: any = {};

        // Filtrer par catégorie (ID de la catégorie)
        if (categoryId) {
            query.categoryId = categoryId;
        }

        // Filtrer par tags (nom des tags)
        // if (tags && tags.length > 0) {
        //     query.tags = { $in: tags };
        // }


        // Filtrer par userId
        if (corporationId) {
            query.createdByVendorId = corporationId;
        }

        await dbConnect();
        // const corporations = await Corporation.find({});
        // res.status(200).json(corporations);
        // Exécuter la requête de recherche
        const products = await Product.find(query)

        console.log('Produits trouvées:', products);
        return createCorsResponse(products);
    } catch (error) {
        console.log('[Produits données] ', error);
        return createCorsResponse("Internal error : Erreur lors de la recherche des produits:", { status: 500 });
    }
}