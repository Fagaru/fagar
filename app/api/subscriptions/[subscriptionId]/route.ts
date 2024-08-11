import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Subscription from '@/models/subscription.model';
import mongoose from "mongoose";
import User, { ROLES } from "@/models/user.model";
import { withAuth } from "@/lib/auth";

interface AuthenticatedRequest extends Request {
    user?: any;
}

export async function PATCH (
    req: AuthenticatedRequest,
    { params }: { params: {subscriptionId: string}}
) {
    try {
        // Vérifiez l'authentification et les rôles
        const authResponse = await withAuth(['admin'], req);
        if (authResponse) return authResponse;
        const body = await req.json();

        await dbConnect();

        if (!mongoose.Types.ObjectId.isValid(params.subscriptionId)) {
            return new NextResponse('Invalid Subscription ID', { status: 400 });
        }
        
        // Récupérer la Subscription actuelle
        const currentSubscription = await Subscription.findById(params.subscriptionId);
    
        if (!currentSubscription) {
            return new NextResponse('Subscription not found', { status: 404 });
        }
    
        // Mettre à jour la Subscription
        const filter = {_id: params.subscriptionId};
        const updatedSubscription = await Subscription.updateOne(
            filter, 
            { ...body, 
                _id: params.subscriptionId, 
                updateAt: Date.now()
            }
        );

        console.log('Updated Subscription:', updatedSubscription);

        return NextResponse.json(updatedSubscription);
    } catch (error) {
        console.log('[Subscription_PATCH] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req: AuthenticatedRequest,
    { params }: { params: {subscriptionId: string}}
) {
    try {
        // Vérifiez l'authentification et les rôles
        const authResponse = await withAuth(['admin'], req);
        if (authResponse) return authResponse;

        await dbConnect();
        
        if (!mongoose.Types.ObjectId.isValid(params.subscriptionId)) {
            return new NextResponse('Invalid Subscription ID', { status: 400 });
        }
        
        // Récupérer la Subscription actuelle
        const currentSubscription = await Subscription.findById(params.subscriptionId);
    
        if (!currentSubscription) {
            return new NextResponse('Subscription not found', { status: 404 });
        }

        const filter = {_id: params.subscriptionId};
        const deleteSubscription = await Subscription.deleteOne(filter);
        
        return NextResponse.json(deleteSubscription);
    } catch (error) {
        console.log('[Subscription_DELETE] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request,
    { params }: { params: {subscriptionId: string}}
) {
    try {

        if (!mongoose.Types.ObjectId.isValid(params.subscriptionId)) {
            return new NextResponse('Invalid Subscription ID', { status: 400 });
        }
        
        await dbConnect();
        const filter = {_id: params.subscriptionId};
        const subscription = await Subscription.findOne(filter);

        return NextResponse.json(subscription);
    } catch (error) {
        console.log('[Subscription_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}