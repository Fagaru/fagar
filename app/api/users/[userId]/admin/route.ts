import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import mongoose from "mongoose";
import User from "@/models/user.model";
import { withAuth } from "@/lib/auth";
import { createCorsResponse } from "@/lib/createCorsResponse";

interface AuthenticatedRequest extends Request {
    user?: any;
}

export async function PATCH (
    req: AuthenticatedRequest,
    { params }: { params: Promise<{userId: string}>}
) {
    try {
        if (!(await params).userId) {
            return createCorsResponse("User ID is required", {  status: 400});
        }

        const authResponse = await withAuth(['admin'], req);
        if (authResponse) return authResponse;
        const body = await req.json();


        if (!mongoose.Types.ObjectId.isValid((await params).userId)) {
            return createCorsResponse('Invalid user ID', { status: 400 });
        }

        body.image = Array.isArray(body.image) ? body.image[0] : body.image;
        
        
        await dbConnect();
        const filter = {_id: (await params).userId};
        const currentUser = await User.findOne(filter);
    
        if (!currentUser) {
            return createCorsResponse('Utilisateur introuvable', { status: 404 });
        }
        
        const updatedUser = await User.updateOne(
            filter, 
            { ...body, 
                _id: (await params).userId, 
                updateAt: Date.now()
            }
        );

        return createCorsResponse(updatedUser);
    } catch (error) {
        console.log('[USER_PATCH] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req: AuthenticatedRequest,
    { params }: { params: Promise<{userId: string}>}
) {
    try {
        if (!(await params).userId) {
            return createCorsResponse("User ID is required", {  status: 400});
        }
        const authResponse = await withAuth(['admin'], req);
        if (authResponse) return authResponse;

        await dbConnect();
        const filter = {_id: (await params).userId};
        const currentUser = await User.findOne(filter);
    
        if (!currentUser) {
            return createCorsResponse('Utilisateur introuvable', { status: 404 });
        }
        
        const deleteUser = await User.deleteOne(filter);
        
        return createCorsResponse(deleteUser);
    } catch (error) {
        console.log('[USER_DELETE] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: AuthenticatedRequest,
    { params }: { params: Promise<{userId: string}>}
) {
    try {
        if (!(await params).userId) {
            return createCorsResponse("User ID is required", {  status: 400});
        }
        const authResponse = await withAuth(['admin'], req);
        if (authResponse) return authResponse;

        await dbConnect();
        const filter = {_id: (await params).userId};
        const user = await User.findOne(filter);

        if (!user) {
            return createCorsResponse('Utilisateur introuvable', { status: 404 });
        }

        return createCorsResponse(user);
    } catch (error) {
        console.log('[USER_GET] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
}