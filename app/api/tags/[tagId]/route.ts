import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Tag from '@/models/tag.model';

export async function PATCH (
    req: Request,
    { params }: { params: {tagId: string}}
) {
    try {
        // const userId = "1234";
        const body = await req.json();

        const { label } = body;

        // if (!userId) {
        //     return new NextResponse("Unauthorized", { status: 401 });
        
        await dbConnect();
        // Récupérer la TAG actuelle
        const currentTag = await Tag.findById(params.tagId);
    
        if (!currentTag) {
          throw new Error('TAG not found');
        }
    
        // Mettre à jour la TAG
        const filter = {_id: params.tagId};
        const updatedTag = await Tag.updateOne(
            filter, 
            { ...body, 
                _id: params.tagId, 
                updateAt: Date.now()
            }
        );

        console.log('Updated TAG:', updatedTag);

        return NextResponse.json(updatedTag);
    } catch (error) {
        console.log('[TAG_PATCH] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req: Request,
    { params }: { params: {tagId: string}}
) {
    try {
        // const userId = "1234";

        // if (!userId) {
        //     return new NextResponse("Unauthorized", { status: 401 });
        // }
        await dbConnect();
        const filter = {_id: params.tagId};

        const currentTag = await Tag.findById(params.tagId);
        if (!currentTag) {
            throw new Error('TAG not found');
        }
        
        const deleteTag = await Tag.deleteOne(filter);
        
        return NextResponse.json(deleteTag);
    } catch (error) {
        console.log('[TAG_DELETE] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request,
    { params }: { params: {tagId: string}}
) {
    try {
        await dbConnect();
        const filter = {_id: params.tagId};
        const tag = await Tag.findOne(filter);

        return NextResponse.json(tag);
    } catch (error) {
        console.log('[TAG_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}