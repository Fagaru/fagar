import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import City from "@/models/city.model";

export async function POST(
    req: Request,
    { params } : { params: { cityId: string }}
) {
    try {
        // const { userId } = auth();

        const userId = "1234";
        const body = await req.json();

        const { label, imageUrl } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!label) {
            return new NextResponse("Label is required", {  status: 400});
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", {  status: 400});
        }

        await dbConnect();
        const city = new City({
            label,
            imageUrl
        });

        await city.save();
        return NextResponse.json(city);
    } catch (error) {
        console.log('[CITY_POST] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {
        await dbConnect();
        const cities = await City.find({});

        return NextResponse.json(cities);
    } catch (error) {
        console.log('[CITIES_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}