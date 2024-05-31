import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Region from '@/models/region.model';

export async function PATCH (
    req: Request,
    { params }: { params: {regionId: string}}
) {
    try {
        // const userId = "1234";
        const body = await req.json();

        const { label, imageUrl } = body;

        // if (!userId) {
        //     return new NextResponse("Unauthorized", { status: 401 });
        
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
    req: Request,
    { params }: { params: {regionId: string}}
) {
    try {
        // const userId = "1234";

        // if (!userId) {
        //     return new NextResponse("Unauthorized", { status: 401 });
        // }
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

        const { searchParams } = new URL(req.url);
        const label = searchParams.get("regionLabel") || undefined;
        const regionId = searchParams.get("regionId") || undefined;
        // Construire la requête de recherche
        const query: any = {};

        // Filtrer par nom de région (ID de la catégorie)
        if (label) {
            query.label = label;
        }
    
        // Filtrer par regionId
        if (regionId) {
            query['_id'] = regionId;
        }

        const region = await Region.findOne(query);

        return NextResponse.json(region);
    } catch (error) {
        console.log('[REGION_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}