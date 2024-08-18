import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import City from "@/models/city.model";
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

        const city = new City({
            label,
            imageUrl
        });

        await city.save();
        return createCorsResponse(city);
    } catch (error) {
        console.log('[CITY_POST] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {
        await dbConnect();
        const cities = await City.find({});

        return createCorsResponse(cities);
    } catch (error) {
        console.log('[CITIES_GET] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
}