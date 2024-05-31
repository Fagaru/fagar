import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Category from "@/models/category.model";

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

        if (!imageUrl) {
            return new NextResponse("Image URL is required", {  status: 400});
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
        const category = new Category({
            label,
            imageUrl
        });

        await category.save();
        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORY_POST] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {
        await dbConnect();
        const categories = await Category.find({});

        return NextResponse.json(categories);
    } catch (error) {
        console.log('[CATEGORY_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}