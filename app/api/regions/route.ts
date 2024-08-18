import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Region from "@/models/region.model";
import User, { ROLES } from "@/models/user.model";
import { withAuth } from "@/lib/auth";
import { createCorsResponse } from "@/lib/createCorsResponse";

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
        const authResponse = await withAuth(['admin'], req);
        if (authResponse) return authResponse;

        const body = await req.json();

        const { label, imageUrl } = body;

        await dbConnect();

        if (!label) {
            return createCorsResponse("Label is required", {  status: 400});
        }

        const region = new Region({
            label,
            imageUrl
        });

        await region.save();
        return createCorsResponse(region);
    } catch (error) {
        console.log('[REGION_POST] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {
        await dbConnect();
        const regions = await Region.find({});

        return createCorsResponse(regions);
    } catch (error) {
        console.log('[REGION_GET] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
}