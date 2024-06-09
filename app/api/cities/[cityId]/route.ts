import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import City from '@/models/city.model';
import mongoose from "mongoose";

export async function PATCH (
    req: Request,
    { params }: { params: {cityId: string}}
) {
    try {
        // const userId = "1234";
        const body = await req.json();

        const { label, imageUrl } = body;

        // if (!userId) {
        //     return new NextResponse("Unauthorized", { status: 401 });

        if (!mongoose.Types.ObjectId.isValid(params.cityId)) {
            return new NextResponse('Invalid city ID', { status: 400 });
        }
        
        await dbConnect();
        // Récupérer la CITY actuelle
        const currentCity = await City.findById(params.cityId);
    
        if (!currentCity) {
            return new NextResponse('City not found', { status: 404 });
        }
    
        // Mettre à jour la CitY
        const filter = {_id: params.cityId};
        const updatedCity = await City.updateOne(
            filter, 
            { ...body, 
                _id: params.cityId, 
                updateAt: Date.now()
            }
        );

        console.log('Updated CITY:', updatedCity);

        return NextResponse.json(updatedCity);
    } catch (error) {
        console.log('[CITY_PATCH] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req: Request,
    { params }: { params: {cityId: string}}
) {
    try {
        // const userId = "1234";

        // if (!userId) {
        //     return new NextResponse("Unauthorized", { status: 401 });
        // }
        await dbConnect();
        const filter = {_id: params.cityId};

        const currentCity = await City.findById(params.cityId);
        if (!currentCity) {
            throw new Error('CITY not found');
        }
        
        const deleteCity = await City.deleteOne(filter);
        
        return NextResponse.json(deleteCity);
    } catch (error) {
        console.log('[CITY_DELETE] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request,
    { params }: { params: {cityId: string}}
) {
    try {
        await dbConnect();
        const filter = {_id: params.cityId};
        const city = await City.findOne(filter);

        return NextResponse.json(city);
    } catch (error) {
        console.log('[CITY_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}