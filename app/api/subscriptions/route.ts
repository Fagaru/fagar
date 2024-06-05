import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Subscription from "@/models/subscription.model";

export async function POST(
    req: Request
) {
    try {
        // const { userId } = auth();

        const userId = "1234";
        const body = await req.json();

        const { label, description, price } = body;

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
        const subscription = new Subscription({
            label,
            description,
            price
        });

        await subscription.save();
        return NextResponse.json(subscription);
    } catch (error) {
        console.log('[Subscription_POST] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {
        await dbConnect();
        const subscriptions = await Subscription.find({});

        return NextResponse.json(subscriptions);
    } catch (error) {
        console.log('[Subscription_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}