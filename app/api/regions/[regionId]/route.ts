import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Region from '@/models/region.model';
import User, { ROLES } from "@/models/user.model";
import { withAuth } from "@/lib/auth";

interface AuthenticatedRequest extends Request {
    user?: any;
}

export async function PATCH (
    req: AuthenticatedRequest,
    { params }: { params: {regionId: string}}
) {
    try {
        const authResponse = await withAuth(['admin'], req);
        if (authResponse) return authResponse;

        const body = await req.json();

        const { label, imageUrl } = body;

        await dbConnect();
    
        // Récupérer la REGION actuelle
        const currentRegion = await Region.findById(params.regionId);
    
        if (!currentRegion) {
          throw new Error('REGION not found');
        }
    
        // Mettre à jour la REGION
        const filter = {_id: params.regionId};
        const updatedRegion = await Region.updateOne(
            filter, 
            { ...body, 
                _id: params.regionId, 
                updateAt: Date.now()
            }
        );

        console.log('Updated REGION:', updatedRegion);

        return NextResponse.json(updatedRegion);
    } catch (error) {
        console.log('[REGION_PATCH] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req: AuthenticatedRequest,
    { params }: { params: {regionId: string}}
) {
    try {
        const authResponse = await withAuth(['admin'], req);
        if (authResponse) return authResponse;

        await dbConnect();
        const filter = {_id: params.regionId};

        const currentRegion = await Region.findById(params.regionId);
        if (!currentRegion) {
            throw new Error('REGION not found');
        }
        
        const deleteRegion = await Region.deleteOne(filter);
        
        return NextResponse.json(deleteRegion);
    } catch (error) {
        console.log('[REGION_DELETE] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request,
    { params }: { params: {regionId: string}}
) {
    try {
        await dbConnect();
        const filter = {_id: params.regionId};
        const region = await Region.findOne(filter);

        return NextResponse.json(region);
    } catch (error) {
        console.log('[REGION_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}