import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import mongoose from "mongoose";
import User from "@/models/user.model";
import { withAuth } from "@/lib/auth";
import { createCorsResponse } from "@/lib/createCorsResponse";

interface AuthenticatedRequest extends Request {
    user?: any; // Vous pouvez remplacer 'any' par le type de votre utilisateur si nécessaire
}

export async function PATCH (
    req: AuthenticatedRequest,
) {
    try {
        const authResponse = await withAuth(['admin', 'professional', 'visitor'], req);
        if (authResponse) return authResponse;
        const body = await req.json();

        body.image = Array.isArray(body.image) ? body.image[0] : body.image;
        
        
        await dbConnect();
        // Récupérer la User actuelle
        const filter = {_id: req.user._id};
        const currentUser = await User.findOne(filter);
    
        if (!currentUser) {
            return createCorsResponse('Utilisateur introuvable', { status: 404 });
        }

        const updatedUser = await User.updateOne(
            filter, 
            { ...body, 
                _id: req.user._id, 
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
) {
    try {
        const authResponse = await withAuth(['admin', 'professional', 'visitor'], req);
        if (authResponse) return authResponse;

        await dbConnect();
        const filter = {_id: req.user._id};
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
) {
    try {
        const authResponse = await withAuth(['admin', 'professional', 'visitor'], req);
        if (authResponse) return authResponse;

        return createCorsResponse(req.user);
    } catch (error) {
        console.log('[USER_GET] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
}