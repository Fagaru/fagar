import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import User from "@/models/user.model";
import { withAuth } from "@/lib/auth";
import { createCorsResponse } from "@/lib/createCorsResponse";

const PEPPER = process.env.PEPPER || 'your-secret-pepper';

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

        const { oldPassword, newPassword } = body;

        if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
            return createCorsResponse('Invalid user ID', { status: 400 });
          }
        
        await dbConnect();
        // Récupérer la User actuelle
        const currentUser = await User.findById(req.user._id);
    
        if (!currentUser) {
            return createCorsResponse('Utilisateur introuvable', { status: 404 });
        }
    
        const isMatch = await bcrypt.compare(oldPassword + PEPPER, currentUser.password);
    
        if (!isMatch) {
          return createCorsResponse("Mot de passe incorrect", { status: 403 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword + PEPPER, salt);
    
        // Mettre à jour du USER
        const filter = {_id: req.user._id};
        const updatedUser = await User.updateOne(
            filter, 
            { 
                password: hashedPassword,
                _id: req.user._id, 
                updateAt: Date.now()
            }
        );

        return createCorsResponse(updatedUser);
    } catch (error) {
        console.log('[USER_PATCH Password] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
};