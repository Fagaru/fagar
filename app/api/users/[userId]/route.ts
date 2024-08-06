import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import mongoose from "mongoose";
import User from "@/models/user.model";

export async function PATCH (
    req: Request,
    { params }: { params: {userId: string}}
) {
    try {
        // const userId = "1234";
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

        console.log('Updated USER:', updatedUser);

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log('[USER_PATCH] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req: Request,
    { params }: { params: {userId: string}}
) {
    try {
        // const userId = "1234";

        // if (!userId) {
        //     return new NextResponse("Unauthorized", { status: 401 });
        // }
        await dbConnect();
        const filter = {_id: params.userId};

        const currentUser = await User.findById(params.userId);
        if (!currentUser) {
            throw new Error('USER not found');
        }
        
        const deleteUser = await User.deleteOne(filter);
        
        return NextResponse.json(deleteUser);
    } catch (error) {
        console.log('[USER_DELETE] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request,
    { params }: { params: {userId: string}}
) {
    try {
        await dbConnect();
        const filter = {_id: params.userId};
        const user = await User.findOne(filter).select(['-password']);

        return NextResponse.json(user);
    } catch (error) {
        console.log('[USER_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}