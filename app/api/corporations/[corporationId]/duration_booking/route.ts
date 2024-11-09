import dbConnect from '@/lib/dbConnect';
import mongoose from "mongoose";

import User from "@/models/user.model";
import { withAuth } from "@/lib/auth";
import { createCorsResponse } from "@/lib/createCorsResponse";
import Corporation from "@/models/corporation.model";

interface AuthenticatedRequest extends Request {
    user?: any; // Vous pouvez remplacer 'any' par le type de votre utilisateur si nécessaire
}

export async function PATCH (
    req: AuthenticatedRequest,
) {
    try {
        const authResponse = await withAuth(['admin', 'professional'], req);
        if (authResponse) return authResponse;
        const body = await req.json();

        const { duration_booking, corporationId } = body;

        if (!duration_booking || !corporationId) {
            return createCorsResponse('Entrées invalides', { status: 400 });
        }

        if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
            return createCorsResponse('Invalid user ID', { status: 400 });
          }
        
        await dbConnect();
        // Récupérer la User actuelle
        const currentUser = await User.findById(req.user._id);
    
        if (!currentUser) {
            return createCorsResponse('Utilisateur introuvable', { status: 404 });
        }

        const currentCorporation = await Corporation.findById(corporationId);
    
        const isMatch = currentCorporation?.userId === currentUser._id;
    
        if (!isMatch && (currentUser.role === "professional")) {
            return createCorsResponse("Accés non autorisé", { status: 400 });
        }
    
        // Mettre à jour du USER
        const filter = {_id: corporationId};
        const updatedDuration = await Corporation.updateOne(
            filter, 
            { 
                duration_booking: duration_booking,
                _id: corporationId, 
                updateAt: Date.now()
            }
        );

        return createCorsResponse(updatedDuration);
    } catch (error) {
        console.log('[Corporation_PATCH Duration] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
};