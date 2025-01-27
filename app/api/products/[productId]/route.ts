import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import moment from 'moment';
import User, { ROLES } from "@/models/user.model";
import { withAuth } from "@/lib/auth";
import { createCorsResponse } from "@/lib/createCorsResponse";
import Product from "@/models/product.model";

interface AuthenticatedRequest extends Request {
    user?: any;
}

export async function PATCH (
    req: AuthenticatedRequest,
    { params }: { params: Promise <{psin: string}>}
) {
    try {
        const authResponse = await withAuth(['admin', 'professional'], req);
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

        
        // Récupérer la corporation actuelle
        const currentProduct = await Product.findById( (await params).psin);
    
        if (!currentProduct) {
            return createCorsResponse('Product not found', { status: 404 });
        }

        if (req.user.role === ROLES.PROFESSIONAL && req.user._id !== currentProduct.createdByVendorId) {
            return createCorsResponse('Unauthorized', { status: 401 });
        }
    
        // Maintenir les valeurs actuelles si les nouvelles sont vides
        if (!body.images || body.images.length === 0) {
          body.images = createdByVendorId.mainImage;
        }
    
        // if (!body.tags || body.tags.length === 0) {
        //   body.tags = currentCorporation.tags;
        // }
    
        await dbConnect();
        // Mettre à jour la corporation
        const filter = {psin: (await params).psin};
        const updatedProduct = await Product.updateOne(
            filter, 
            { ...body, 
                psin: (await params).psin, 
                updateAt: Date.now()
            }
        );

        return createCorsResponse(updatedProduct);
    } catch (error) {
        console.log('[Product updated] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req: AuthenticatedRequest,
    { params }: { params: Promise<{psin: string}>}
) {
    try {
        const authResponse = await withAuth(['admin', 'professional'], req);
        if (authResponse) return authResponse;

        await dbConnect();
        const filter = {_id: (await params).psin};

        const currentProduct = await Product.findOne(filter);
        if (!currentProduct) {
            return createCorsResponse('Product not found', { status: 404 });
        }

        if (req.user.role === ROLES.PROFESSIONAL && req.user._id !== currentProduct.createdByVendorId) {
            return createCorsResponse('Unauthorized', { status: 401 });
        }
        
        const deletedProduct = await Product.deleteOne(filter);
        
        return createCorsResponse(deletedProduct);
    } catch (error) {
        console.log('[Product deleted] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request,
    { params }: { params: Promise<{psin: string}>}
) {
    try {
        await dbConnect();
        const filter = {psin: (await params).psin};
        const product = await Product.findOne(filter);

        return createCorsResponse(product);
    } catch (error) {
        console.log('[Product found] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
}