// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import User, { ROLES } from "@/models/user.model";
import { withAuth } from "@/lib/auth";
import { createCorsResponse } from "@/lib/createCorsResponse";
import Variant from "@/models/variant.model";

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
            productId,
            vendorId,
            sku,
            attributes,
            stock,
            price,
            imageUrl,
            status,
            createdAt,
            updatedAt,
        } = body;

        if (!sku || !productId || vendorId) {
            return createCorsResponse("properties are required", {  status: 400});
        }

        await dbConnect();
        const variant = new Variant({
            productId,
            vendorId,
            sku,
            attributes,
            stock,
            price,
            imageUrl,
            status,
            createdAt,
            updatedAt,
        });

        await variant.save();
        return createCorsResponse(variant);
    } catch (error) {
        console.log('[Variant created] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        const sku = searchParams.get("sku") || undefined;
        const vendorId = searchParams.get("corporrationId") || undefined;
        const attributes = searchParams.get("attributes") || undefined;

        // Construire la requête de recherche
        const query: any = {};

        // Filtrer par catégorie (ID de la catégorie)
        if (categoryId) {
            query.categoryId = categoryId;
        }

        // Filtrer par tags (nom des tags)
        if (attributes && attributes.length > 0) {
            query.tags = { $in: attributes };
        }

        if (vendorId) {
            query.userId = vendorId;
        }

        await dbConnect();
        const variants = await Variant.find(query)

        console.log('Variants trouvés:', variants);
        return createCorsResponse(variants);
    } catch (error) {
        console.log('[Varaints found] ', error);
        return createCorsResponse("Internal error : Erreur lors de la recherche des variants:", { status: 500 });
    }
}