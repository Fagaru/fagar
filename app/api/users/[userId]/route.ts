import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import mongoose from "mongoose";
import User from "@/models/user.model";
import { withAuth } from "@/lib/auth";

interface AuthenticatedRequest extends Request {
    user?: any; // Vous pouvez remplacer 'any' par le type de votre utilisateur si nécessaire
}

export async function PATCH (
    req: AuthenticatedRequest,
    { params }: { params: {userId: string}}
) {
    try {
        const authResponse = await withAuth(['admin', 'professional', 'visitor'], req);
        if (authResponse) return authResponse;
        const body = await req.json();

        const { label, imageUrl } = body;

        // if (!userId) {
        //     return new NextResponse("Unauthorized", { status: 401 });
        if (!mongoose.Types.ObjectId.isValid(params.userId)) {
            return new NextResponse('Invalid user ID', { status: 400 });
          }
        
        await dbConnect();
        // Récupérer la User actuelle
        const currentUser = await User.findById(params.userId);
    
        if (!currentUser) {
            return new NextResponse('User not found', { status: 404 });
        }
    
        // Mettre à jour du USER
        const filter = {_id: params.userId};
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
        const authResponse = await withAuth(['admin', 'professional', 'visitor'], req);
        if (authResponse) return authResponse;

        await dbConnect();
        const filter = {_id: params.userId};
        
        const deleteUser = await User.deleteOne(filter);
        
        return NextResponse.json(deleteUser);
    } catch (error) {
        console.log('[USER_DELETE] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: AuthenticatedRequest,
) {
    try {
        const authResponse = await withAuth(['admin', 'professional', 'visitor'], req);
        if (authResponse) return authResponse;

        return NextResponse.json(req.user);
    } catch (error) {
        console.log('[USER_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}