import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import City from '@/models/city.model';
import mongoose from "mongoose";
import User, { ROLES } from "@/models/user.model";
import { withAuth } from "@/lib/auth";
import { createCorsResponse } from "@/lib/createCorsResponse";

interface AuthenticatedRequest extends Request {
    user?: any;
}

export async function PATCH (
    req: AuthenticatedRequest,
    { params }: { params: Promise <{cityId: string}>}
) {
    try {

        const authResponse = await withAuth(['admin'], req);
        if (authResponse) return authResponse;
        
        const body = await req.json();

        await dbConnect();

        if (!mongoose.Types.ObjectId.isValid((await params).cityId)) {
            return createCorsResponse('Invalid city ID', { status: 400 });
        }

        // Récupérer la CITY actuelle
        const currentCity = await City.findById((await params).cityId);
    
        if (!currentCity) {
            return createCorsResponse('City not found', { status: 404 });
        }
    
        // Mettre à jour la CitY
        const filter = {_id: (await params).cityId};
        const updatedCity = await City.updateOne(
            filter, 
            { ...body, 
                _id: (await params).cityId, 
                updateAt: Date.now()
            }
        );

        console.log('Updated CITY:', updatedCity);

        return createCorsResponse(updatedCity);
    } catch (error) {
        console.log('[CITY_PATCH] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req: AuthenticatedRequest,
    { params }: { params: Promise <{cityId: string}>}
) {
    try {
        const authResponse = await withAuth(['admin'], req);
        if (authResponse) return authResponse;

        await dbConnect();
        
        const filter = {_id: (await params).cityId};

        const currentCity = await City.findById((await params).cityId);
        if (!currentCity) {
            throw new Error('CITY not found');
        }
        
        const deleteCity = await City.deleteOne(filter);
        
        return createCorsResponse(deleteCity);
    } catch (error) {
        console.log('[CITY_DELETE] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request,
    { params }: { params: Promise <{cityId: string}>}
) {
    try {
        await dbConnect();
        const filter = {_id: (await params).cityId};
        const city = await City.findOne(filter);

        return createCorsResponse(city);
    } catch (error) {
        console.log('[CITY_GET] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
}