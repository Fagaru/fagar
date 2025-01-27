import dbConnect from '@/lib/dbConnect';
import Booking from '@/models/booking.model';
import { withAuth } from "@/lib/auth";
import { createCorsResponse } from "@/lib/createCorsResponse";
 
// Types d'utilisateurs autorisés
const allowedRolesForPATCH = ['admin', 'professional', 'visitor'];
 
export async function PATCH(req: Request,
    { params }: { params: Promise<{bookingId: string}>}
) {
    try {
 
        const authResponse = await withAuth(allowedRolesForPATCH, req);
        if (authResponse) return authResponse;
 
        const id = (await params).bookingId; // Récupérer l'ID de la réservation depuis l'URL
        const body = await req.json();
        const { status } = body;
 
        if (!['pending', 'confirmed', 'denied'].includes(status)) {
            return createCorsResponse("Statut invalide", { status: 400 });
        }
 
        await dbConnect();
        const booking = await Booking.findById(id);
        if (!booking) {
            return createCorsResponse("Réservation non trouvée", { status: 404 });
        }
 
        booking.status = status;
        await booking.save();
 
        return createCorsResponse(booking);
    } catch (error) {
        console.log('[BOOKING_PATCH] ', error);
        return createCorsResponse("Internal Error", { status: 500 });
    }
}