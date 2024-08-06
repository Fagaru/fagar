import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Region from "@/models/region.model";

// Types d'utilisateurs autorisés
const allowedRolesForPOST = ['admin'];
const allowedRolesForGET = ['admin', 'professional', 'visitor', 'anonymous'];

export async function POST(
    req: Request
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

        // const storeByUserId = await prismadb.store.findFirst({
        //     where: {
        //         id: params.storeId,
        //         userId
        //     }
        // });

        // if (!storeByUserId) {
        //     return new NextResponse("Unauthorized", {  status: 403});
        // }

        await dbConnect();
        const region = new Region({
            label,
            imageUrl
        });

        await region.save();
        return NextResponse.json(region);
    } catch (error) {
        console.log('[REGION_POST] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {
        await dbConnect();
        const regions = await Region.find({});

        return NextResponse.json(regions);
    } catch (error) {
        console.log('[REGION_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}