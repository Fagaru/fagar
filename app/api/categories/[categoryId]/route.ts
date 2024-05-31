import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Category from '@/models/category.model';

export async function PATCH (
    req: Request,
    { params }: { params: {categoryId: string}}
) {
    try {
        // const userId = "1234";
        const body = await req.json();

        const { label, imageUrl } = body;

        // if (!userId) {
        //     return new NextResponse("Unauthorized", { status: 401 });
        
        await dbConnect();
        // Récupérer la CATEGORY actuelle
        const currentCategory = await Category.findById(params.categoryId);
    
        if (!currentCategory) {
          throw new Error('CATEGORY not found');
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

        console.log('Updated CATEGORY:', updatedCategory);

        return NextResponse.json(updatedCategory);
    } catch (error) {
        console.log('[CATEGORY_PATCH] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req: Request,
    { params }: { params: {categoryId: string}}
) {
    try {
        // const userId = "1234";

        // if (!userId) {
        //     return new NextResponse("Unauthorized", { status: 401 });
        // }
        await dbConnect();
        const filter = {_id: params.categoryId};

        const currentCategory = await Category.findById(params.categoryId);
        if (!currentCategory) {
            throw new Error('CATEGORY not found');
        }
        
        const deleteCategory = await Category.deleteOne(filter);
        
        return NextResponse.json(deleteCategory);
    } catch (error) {
        console.log('[CATEGORY_DELETE] ', error);
        return new NextResponse("Internal error", { status: 500 });
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

        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORY_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}