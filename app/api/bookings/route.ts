import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Booking from '@/models/booking.model';
import { withAuth } from "@/lib/auth";
import { createCorsResponse } from "@/lib/createCorsResponse";

// Types d'utilisateurs autorisés
const allowedRolesForPOST = ['admin', 'professional', 'visitor'];

export async function POST(req: Request) {
    try {
        // Vérification de l'authentification et des rôles
        const authResponse = await withAuth(allowedRolesForPOST, req);
        if (authResponse) return authResponse;

        const body = await req.json();
        const { userId, corporationId, date, timeSlot } = body;

        //console.log("TRACE BOOKING", body);
    
        if (!userId || !corporationId || !date || !timeSlot || !timeSlot.startTime || !timeSlot.endTime) {
            return createCorsResponse("Tous les champs sont obligatoires, y compris le créneau horaire.", { status: 400 });
        }
    
        // Validation pour s'assurer que l'heure de fin est après l'heure de début
        if (timeSlot.endTime <= timeSlot.startTime) {
            return createCorsResponse("L'heure de fin doit être après l'heure de début.", { status: 400 });
        }
    
        // Connexion à la base de données
        await dbConnect();

        // Vérification dans la route POST avant la création de la réservation
        const existingBooking = await Booking.findOne({
            corporationId,
            date,
            timeSlot,
            status: { $in: ['pending', 'confirmed'] }, // Exclure les réservations annulées
        });

        if (existingBooking) {
            return createCorsResponse("Le créneau horaire n'est pas disponible", { status: 400 });
        }
    
        // Créer une nouvelle réservation avec le créneau horaire
        const booking = new Booking({
            userId,
            corporationId,
            date,
            timeSlot,
        });
    
        await booking.save();
    
        return createCorsResponse(booking, { status: 201 });
    } catch (error) {
      console.error('Erreur lors de la création de la réservation', error);
      return createCorsResponse("Internal Error", { status: 500 });
    }
  }

// Types d'utilisateurs autorisés
const allowedRolesForGET = ['admin', 'professional', 'visitor'];

// export async function GET(req: Request) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const userId = searchParams.get("userId") || undefined;
//         const corporationId = searchParams.get("corporationId") || undefined;
//         const status = searchParams.get("status") || undefined;
//         const startDate = searchParams.get("startDate") || undefined;
//         const endDate = searchParams.get("endDate") || undefined;

//         const query: any = {};

//         if (userId) query.userId = userId;
//         if (corporationId) query.corporationId = corporationId;
//         if (status) query.status = status;
//         if (startDate || endDate) {
//             query.date = {
//                 ...(startDate && { $gte: new Date(startDate) }),
//                 ...(endDate && { $lte: new Date(endDate) }),
//             };
//         }

//         await dbConnect();
//         const bookings = await Booking.find(query)
//             .populate('userId')
//             .populate('corporationId')
//             .exec();

//         console.log('Réservations trouvées:', bookings);
//         return createCorsResponse(bookings);
//     } catch (error) {
//         console.log('[BOOKING_GET] ', error);
//         return createCorsResponse("Internal Error", { status: 500 });
//     }
// }

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId") || undefined;
        const corporationId = searchParams.get("corporationId") || undefined;
        const status = searchParams.get("status") || undefined;
        const startDate = searchParams.get("startDate") || undefined;
        const endDate = searchParams.get("endDate") || undefined;
        const startTime = searchParams.get("startTime") || undefined;
        const endTime = searchParams.get("endTime") || undefined;

        const query: any = {};

        // Filtrer par userId
        if (userId) query.userId = userId;

        // Filtrer par corporationId
        if (corporationId) query.corporationId = corporationId;

        // Filtrer par statut
        if (status) query.status = status;

        // Filtrer par date
        if (startDate || endDate) {
            query.date = {
                ...(startDate && { $gte: new Date(startDate) }),
                ...(endDate && { $lte: new Date(endDate) }),
            };
        }

        // Filtrer par timeSlot (heure de début et heure de fin)
        if (startTime || endTime) {
            query['timeSlot.startTime'] = {
                ...(startTime && { $gte: new Date(startTime) }), // Heure de début minimum
                ...(endTime && { $lte: new Date(endTime) }),     // Heure de fin maximum
            };
        }

        // Connexion à la base de données
        await dbConnect();

        // Recherche des réservations
        const bookings = await Booking.find(query)
            .populate('userId')
            .populate('corporationId')
            .exec();

        console.log('Réservations trouvées:', bookings);
        return createCorsResponse(bookings);
    } catch (error) {
        console.log('[BOOKING_GET] ', error);
        return createCorsResponse("Internal Error", { status: 500 });
    }
}