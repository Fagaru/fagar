import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Category from '@/models/category.model';
import mongoose from "mongoose";
import User, { ROLES } from "@/models/user.model";
import { withAuth } from "@/lib/auth";
import { createCorsResponse } from "@/lib/createCorsResponse";

interface AuthenticatedRequest extends Request {
    user?: any;
}

export async function PATCH (
    req: AuthenticatedRequest,
    { params }: { params: {categoryId: string}}
) {
    try {
        const authResponse = await withAuth(['admin'], req);
        if (authResponse) return authResponse;

        const body = await req.json();

        await dbConnect();
        
        if (!mongoose.Types.ObjectId.isValid(params.categoryId)) {
            return createCorsResponse('Invalid category ID', { status: 400 });
          }
        
        // Récupérer la CATEGORY actuelle
        const currentCategory = await Category.findById(params.categoryId);
    
        if (!currentCategory) {
            return createCorsResponse('Category not found', { status: 404 });
        }
    
        // Mettre à jour la CATEGORY
        const filter = {_id: params.categoryId};
        const updatedCategory = await Category.updateOne(
            filter, 
            { ...body, 
                _id: params.categoryId, 
                updateAt: Date.now()
            }
        );

        return createCorsResponse(updatedCategory);
    } catch (error) {
        console.log('[CATEGORY_PATCH] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req: AuthenticatedRequest,
    { params }: { params: {categoryId: string}}
) {
    try {
        const authResponse = await withAuth(['admin'], req);
        if (authResponse) return authResponse;

        await dbConnect();
        
        const filter = {_id: params.categoryId};

        const currentCategory = await Category.findById(params.categoryId);
        if (!currentCategory) {
            throw new Error('CATEGORY not found');
        }
        
        const deleteCategory = await Category.deleteOne(filter);
        
        return createCorsResponse(deleteCategory);
    } catch (error) {
        console.log('[CATEGORY_DELETE] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request,
    { params }: { params: {categoryId: string}}
) {
    try {
        await dbConnect();
        const filter = {_id: params.categoryId};
        const category = await Category.findOne(filter);

        return createCorsResponse(category);
    } catch (error) {
        console.log('[CATEGORY_GET] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
}