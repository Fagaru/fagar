import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Corporation from '@/models/corporation.model';
import moment from 'moment';
import User, { ROLES } from "@/models/user.model";
import { withAuth } from "@/lib/auth";
import { createCorsResponse } from "@/lib/createCorsResponse";

// Interface for Schedule Subschema
interface ISchedule {
    dayWeek: number;
    begin_am: string;
    end_am: string;
    begin_pm: string;
    end_pm: string;
    available: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface AuthenticatedRequest extends Request {
    user?: any;
}

export async function PATCH (
    req: AuthenticatedRequest,
    { params }: { params: Promise<{corporationId: string}>}
) {
    try {
        const authResponse = await withAuth(['admin', 'professional'], req);
        if (authResponse) return authResponse;
        
        const body = await req.json();

        const {
            name, userId, phone, mail_pro, description, siretNum, siren_num, codeNAF, linkFacebook, linkInstagram, linkLinkedIn, linkX,
            starting_date, numEmplyees, address, categoryId, tags, images, schedules, duration_booking
        } = body;

        console.log("DURATION BACKEND", duration_booking)

        
        // Récupérer la corporation actuelle
        const currentCorporation = await Corporation.findById((await params).corporationId);
    
        if (!currentCorporation) {
            return createCorsResponse('Corporation not found', { status: 404 });
        }

        if (req.user.role === ROLES.PROFESSIONAL && req.user._id !== currentCorporation.userId) {
            return createCorsResponse('Unauthorized', { status: 401 });
        }
    
        // Maintenir les valeurs actuelles si les nouvelles sont vides
        if (!body.images || body.images.length === 0) {
          body.images = currentCorporation.images;
        }
    
        if (!body.schedules || body.schedules.length === 0) {
          body.schedules = currentCorporation.schedules;
        }
    
        if (!body.tags || body.tags.length === 0) {
          body.tags = currentCorporation.tags;
        }

        if (!body.duration_booking) {
            body.duration_booking = currentCorporation.duration_booking;
          }

        // let dateAndTime = moment(schedule.begin_am, [moment.ISO_8601, 'HH:mm']);

        // Ensure schedules are correctly formatted
        const updatedSchedules = body.schedules.map((schedule: ISchedule) => ({
            ...schedule,
            begin_am: schedule.begin_am,
            end_am: schedule.end_am,
            begin_pm: schedule.begin_pm,
            end_pm: schedule.end_pm,
        }));

        console.log("DURATION BACKEND BODY", body);
    
        await dbConnect();
        // Mettre à jour la corporation
        const filter = {_id: (await params).corporationId};
        const updatedCorporation = await Corporation.updateOne(
            filter, 
            { ...body, 
                schedules: updatedSchedules,
                duration_booking: body.duration_booking,
                _id: (await params).corporationId, 
                updateAt: Date.now()
            }
        );

        return createCorsResponse(updatedCorporation);
    } catch (error) {
        console.log('[CORPORATION_PATCH] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req: AuthenticatedRequest,
    { params }: { params: Promise <{corporationId: string}>}
) {
    try {
        const authResponse = await withAuth(['admin', 'professional'], req);
        if (authResponse) return authResponse;

        await dbConnect();
        const filter = {_id: (await params).corporationId};

        const currentCorporation = await Corporation.findOne(filter);
        if (!currentCorporation) {
            return createCorsResponse('Corporation not found', { status: 404 });
        }

        if (req.user.role === ROLES.PROFESSIONAL && req.user._id !== currentCorporation.userId) {
            return createCorsResponse('Unauthorized', { status: 401 });
        }
        
        const deleteCorporation = await Corporation.deleteOne(filter);
        
        return createCorsResponse(deleteCorporation);
    } catch (error) {
        console.log('[CORPORATION_DELETE] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request,
    { params }: { params: Promise <{corporationId: string}>}
) {
    try {
        await dbConnect();
        const filter = {_id: (await params).corporationId};
        const corporation = await Corporation.findOne(filter);

        return createCorsResponse(corporation);
    } catch (error) {
        console.log('[CORPORATION_GET] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
}