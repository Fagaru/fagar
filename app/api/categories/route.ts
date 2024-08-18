import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Category from "@/models/category.model";
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

        if (!imageUrl) {
            return createCorsResponse("Image URL is required", {  status: 400});
        }

        const category = new Category({
            label,
            imageUrl
        });

        await category.save();
        return createCorsResponse(category);
    } catch (error) {
        console.log('[CATEGORY_POST] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {
        await dbConnect();
        const categories = await Category.find({});

        return createCorsResponse(categories);
    } catch (error) {
        console.log('[CATEGORY_GET] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
}