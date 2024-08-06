import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Tag from "@/models/tag.model";

// Types d'utilisateurs autorisés
const allowedRolesForPOST = ['admin', 'professional'];
const allowedRolesForGET = ['admin', 'professional', 'visitor', 'anonymous'];

export async function POST(
    req: Request
) {
    try {
        // const { userId } = auth();

        const userId = "1234";
        const body = await req.json();

        const { label } = body;

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
        const tag = new Tag({
            label
        });

        await tag.save();
        return NextResponse.json(tag);
    } catch (error) {
        console.log('[TAG_POST] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {
        await dbConnect();
        const tags = await Tag.find({});

        return NextResponse.json(tags);
    } catch (error) {
        console.log('[TAG_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}