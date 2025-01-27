import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import moment from 'moment';
import User, { ROLES } from "@/models/user.model";
import { withAuth } from "@/lib/auth";
import { createCorsResponse } from "@/lib/createCorsResponse";
import Variant from "@/models/variant.model";

interface AuthenticatedRequest extends Request {
    user?: any;
}

export async function PATCH (
    req: AuthenticatedRequest,
    { params }: { params: Promise<{sku: string}>}
) {
    try {
        const authResponse = await withAuth(['admin', 'professional'], req);
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
        
        // Récupérer la variant actuelle
        const currentVariant = await Variant.findById((await params).sku);
    
        if (!currentVariant) {
            return createCorsResponse('Variant not found', { status: 404 });
        }

        if (req.user.role === ROLES.PROFESSIONAL && req.user._id !== currentVariant.vendorId) {
            return createCorsResponse('Unauthorized', { status: 401 });
        }
    
        // Maintenir les valeurs actuelles si les nouvelles sont vides
        if (imageUrl) {
          body.images = currentVariant.imageUrl;
        }
    
    
        if (attributes || attributes.length === 0) {
          body.attributes = currentVariant.attributes;
        }
    
        await dbConnect();
        // Mettre à jour la variant
        const filter = {_id: (await params).sku};
        const updatedVariant = await Variant.updateOne(
            filter, 
            { ...body, 
                sku: (await params).sku, 
                updateAt: Date.now()
            }
        );

        return createCorsResponse(updatedVariant);
    } catch (error) {
        console.log('[Variant updated] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req: AuthenticatedRequest,
    { params }: { params: Promise <{sku: string}>}
) {
    try {
        const authResponse = await withAuth(['admin', 'professional'], req);
        if (authResponse) return authResponse;

        await dbConnect();
        const filter = {sku: (await params).sku};

        const currentVariant = await Variant.findOne(filter);
        if (!currentVariant) {
            return createCorsResponse('Variant not found', { status: 404 });
        }

        if (req.user.role === ROLES.PROFESSIONAL && req.user._id !== currentVariant.vendorId) {
            return createCorsResponse('Unauthorized', { status: 401 });
        }
        
        const deletedVariant = await Variant.deleteOne(filter);
        
        return createCorsResponse(deletedVariant);
    } catch (error) {
        console.log('[Variant deleted] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request,
    { params }: { params: Promise<{sku: string}>}
) {
    try {
        await dbConnect();
        const filter = {sku: (await params).sku};
        const variant = await Variant.findOne(filter);

        return createCorsResponse(variant);
    } catch (error) {
        console.log('[Variant found] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
}