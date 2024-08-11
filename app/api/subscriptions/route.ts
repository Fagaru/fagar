import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Subscription from "@/models/subscription.model";
import User, { ROLES } from "@/models/user.model";
import { withAuth } from "@/lib/auth";

// Types d'utilisateurs autorisés
const allowedRolesForPOST = ['admin'];
const allowedRolesForGET = ['admin', 'professional', 'visitor', 'anonymous'];

interface AuthenticatedRequest extends Request {
    user?: any;
}

export async function POST(
    req: AuthenticatedRequest
) {
    try {
        // Vérifiez l'authentification et les rôles
        const authResponse = await withAuth(['admin'], req);
        if (authResponse) return authResponse;

        console.log("New req :", req.user);

        const body = await req.json();
        const { label, description, price } = body;

        if (!label) {
        return new NextResponse("Label is required", { status: 400 });
        }

        // Connectez-vous à la base de données
        await dbConnect();

        // Créez la nouvelle souscription
        const subscription = new Subscription({
        label,
        description,
        price
        });

        await subscription.save();

        return NextResponse.json(subscription);
    } catch (error) {
        console.error('[Subscription_POST]', error);
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