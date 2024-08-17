import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import mongoose from "mongoose";
import User from "@/models/user.model";
import { withAuth } from "@/lib/auth";

interface AuthenticatedRequest extends Request {
    user?: any;
}

export async function PATCH (
    req: AuthenticatedRequest,
    { params }: { params: {userId: string}}
) {
    try {
        if (!params.userId) {
            return new NextResponse("User ID is required", {  status: 400});
        }

        const authResponse = await withAuth(['admin'], req);
        if (authResponse) return authResponse;
        const body = await req.json();


        if (!mongoose.Types.ObjectId.isValid(params.userId)) {
            return new NextResponse('Invalid user ID', { status: 400 });
        }

        body.image = Array.isArray(body.image) ? body.image[0] : body.image;
        
        
        await dbConnect();
        const filter = {_id: params.userId};
        const currentUser = await User.findOne(filter);
    
        if (!currentUser) {
            return new NextResponse('Utilisateur introuvable', { status: 404 });
        }
        
        const updatedUser = await User.updateOne(
            filter, 
            { ...body, 
                _id: params.userId, 
                updateAt: Date.now()
            }
        );

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log('[USER_PATCH] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req: AuthenticatedRequest,
    { params }: { params: {userId: string}}
) {
    try {
        if (!params.userId) {
            return new NextResponse("User ID is required", {  status: 400});
        }
        const authResponse = await withAuth(['admin'], req);
        if (authResponse) return authResponse;

        await dbConnect();
        const filter = {_id: params.userId};
        const currentUser = await User.findOne(filter);
    
        if (!currentUser) {
            return new NextResponse('Utilisateur introuvable', { status: 404 });
        }
        
        const deleteUser = await User.deleteOne(filter);
        
        return NextResponse.json(deleteUser);
    } catch (error) {
        console.log('[USER_DELETE] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: AuthenticatedRequest,
    { params }: { params: {userId: string}}
) {
    try {
        if (!params.userId) {
            return new NextResponse("User ID is required", {  status: 400});
        }
        const authResponse = await withAuth(['admin'], req);
        if (authResponse) return authResponse;

        await dbConnect();
        const filter = {_id: params.userId};
        const user = await User.findOne(filter);

        if (!user) {
            return new NextResponse('Utilisateur introuvable', { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.log('[USER_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}