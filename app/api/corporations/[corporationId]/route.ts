import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Corporation from '@/models/corporation.model';
import moment from 'moment';

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

export async function PATCH (
    req: Request,
    { params }: { params: {corporationId: string}}
) {
    try {
        // const userId = "1234";
        const body = await req.json();

        const {
            name, userId, phone, mail_pro, description, siretNum, siren_num, codeNAF, linkFacebook, linkInstagram, linkLinkedIn, linkX,
            starting_date, numEmplyees, address, categoryId, tags, images, schedules
        } = body;

        // if (!userId) {
        //     return new NextResponse("Unauthorized", { status: 401 });
        
        // Récupérer la corporation actuelle
        const currentCorporation = await Corporation.findById(params.corporationId);
    
        if (!currentCorporation) {
          throw new Error('Corporation not found');
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

        // let dateAndTime = moment(schedule.begin_am, [moment.ISO_8601, 'HH:mm']);

        // Ensure schedules are correctly formatted
        const updatedSchedules = schedules.map((schedule: ISchedule) => ({
            ...schedule,
            begin_am: schedule.begin_am,
            end_am: schedule.end_am,
            begin_pm: schedule.begin_pm,
            end_pm: schedule.end_pm,
        }));
    
        await dbConnect();
        // Mettre à jour la corporation
        const filter = {_id: params.corporationId};
        const updatedCorporation = await Corporation.updateOne(
            filter, 
            { ...body, 
                schedules: updatedSchedules,  // Use the correctly formatted schedules
                _id: params.corporationId, 
                updateAt: Date.now()
            }
        );

        console.log('Updated Corporation:', updatedCorporation);

        return NextResponse.json(updatedCorporation);
    } catch (error) {
        console.log('[CORPORATION_PATCH] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req: Request,
    { params }: { params: {corporationId: string}}
) {
    try {
        // const userId = "1234";

        // if (!userId) {
        //     return new NextResponse("Unauthorized", { status: 401 });
        // }

        await dbConnect();
        const filter = {_id: params.corporationId};

        const currentCorporation = await Corporation.findOne(filter);
        if (!currentCorporation) {
            throw new Error('Corporation not found');
        }
        
        const deleteCorporation = await Corporation.deleteOne(filter);
        
        return NextResponse.json(deleteCorporation);
    } catch (error) {
        console.log('[CORPORATION_DELETE] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request,
    { params }: { params: {corporationId: string}}
) {
    try {
        await dbConnect();
        const filter = {_id: params.corporationId};
        const corporation = await Corporation.findOne(filter);

        return NextResponse.json(corporation);
    } catch (error) {
        console.log('[CORPORATION_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}