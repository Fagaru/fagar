import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Subscription from '@/models/subscription.model';
import mongoose from "mongoose";
import User, { ROLES } from "@/models/user.model";
import { withAuth } from "@/lib/auth";
import { createCorsResponse } from "@/lib/createCorsResponse";

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
            return createCorsResponse('Invalid Subscription ID', { status: 400 });
        }
        
        // Récupérer la Subscription actuelle
        const currentSubscription = await Subscription.findById(params.subscriptionId);
    
        if (!currentSubscription) {
            return createCorsResponse('Subscription not found', { status: 404 });
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

        return createCorsResponse(updatedSubscription);
    } catch (error) {
        console.log('[Subscription_PATCH] ', error);
        return createCorsResponse("Internal error", { status: 500 });
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
            return createCorsResponse('Invalid Subscription ID', { status: 400 });
        }
        
        // Récupérer la Subscription actuelle
        const currentSubscription = await Subscription.findById(params.subscriptionId);
    
        if (!currentSubscription) {
            return createCorsResponse('Subscription not found', { status: 404 });
        }

        const filter = {_id: params.subscriptionId};
        const deleteSubscription = await Subscription.deleteOne(filter);
        
        return createCorsResponse(deleteSubscription);
    } catch (error) {
        console.log('[Subscription_DELETE] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request,
    { params }: { params: {subscriptionId: string}}
) {
    try {

        if (!mongoose.Types.ObjectId.isValid(params.subscriptionId)) {
            return createCorsResponse('Invalid Subscription ID', { status: 400 });
        }
        
        await dbConnect();
        const filter = {_id: params.subscriptionId};
        const subscription = await Subscription.findOne(filter);

        return createCorsResponse(subscription);
    } catch (error) {
        console.log('[Subscription_GET] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
}