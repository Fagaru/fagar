import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Category from "@/models/category.model";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticateToken, authorize, withAuth } from "@/lib/auth";
import User, { ROLES } from "@/models/user.model";

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
            return new NextResponse("Label is required", {  status: 400});
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", {  status: 400});
        }

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