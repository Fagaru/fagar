import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import City from '@/models/city.model';

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
        
        await dbConnect();
        // Récupérer la City actuelle
        const currentCity = await City.findById(params.cityId);
    
        if (!currentCity) {
          throw new Error('City not found');
        }
    
        // Mettre à jour la City
        const filter = {_id: params.cityId};
        const updatedCity = await City.updateOne(
            filter, 
            { ...body, 
                _id: params.cityId, 
                updateAt: Date.now()
            }
        );

        console.log('Updated City:', updatedCity);

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
            throw new Error('City not found');
        }
        
        const deleteCity = await City.deleteOne(filter);
        
        return NextResponse.json(deleteCity);
    } catch (error) {
        console.log('[CITY_DELETE] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request
) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const label = searchParams.get("cityLabel") || undefined;
        const cityId = searchParams.get("cityId") || undefined;
        // Construire la requête de recherche
        const query: any = {};

        // Filtrer par nom de ville
        if (label) {
            query.label = label;
        }
    
        // Filtrer par cityId
        if (cityId) {
            query['_id'] = cityId;
        }

        const city = await City.findOne(query);

        return NextResponse.json(city);
    } catch (error) {
        console.log('[CITY_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}