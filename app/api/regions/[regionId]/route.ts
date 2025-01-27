import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Region from '@/models/region.model';
import User, { ROLES } from "@/models/user.model";
import { withAuth } from "@/lib/auth";
import { createCorsResponse } from "@/lib/createCorsResponse";

interface AuthenticatedRequest extends Request {
    user?: any;
}

export async function PATCH (
    req: AuthenticatedRequest,
    { params }: { params: Promise<{regionId: string}>}
) {
    try {
        const authResponse = await withAuth(['admin'], req);
        if (authResponse) return authResponse;

        const body = await req.json();

        await dbConnect();
    
        // Récupérer la REGION actuelle
        const currentRegion = await Region.findById((await params).regionId);
    
        if (!currentRegion) {
            return createCorsResponse('Region not found', { status: 404 });
        }
    
        // Mettre à jour la REGION
        const filter = {_id: (await params).regionId};
        const updatedRegion = await Region.updateOne(
            filter, 
            { ...body, 
                _id: (await params).regionId, 
                updateAt: Date.now()
            }
        );

        console.log('Updated REGION:', updatedRegion);

        return createCorsResponse(updatedRegion);
    } catch (error) {
        console.log('[REGION_PATCH] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req: AuthenticatedRequest,
    { params }: { params: Promise<{regionId: string}>}
) {
    try {
        const authResponse = await withAuth(['admin'], req);
        if (authResponse) return authResponse;

        await dbConnect();
        const filter = {_id: (await params).regionId};

        const currentRegion = await Region.findById((await params).regionId);
        if (!currentRegion) {
            return createCorsResponse('Region not found', { status: 404 });
        }
        
        const deleteRegion = await Region.deleteOne(filter);
        
        return createCorsResponse(deleteRegion);
    } catch (error) {
        console.log('[REGION_DELETE] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request,
    { params }: { params: Promise<{regionId: string}>}
) {
    try {
        await dbConnect();
        const filter = {_id: (await params).regionId};
        const region = await Region.findOne(filter);

        return createCorsResponse(region);
    } catch (error) {
        console.log('[REGION_GET] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
}