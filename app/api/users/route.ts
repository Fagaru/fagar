import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import User from "@/models/user.model";
import bcrypt from "bcrypt";

const PEPPER = process.env.PEPPER || 'password par défaut'; // Utiliser une valeur secrète plus complexe en production

export async function POST(
    req: Request
) {
    try {
        const body = await req.json();

        const { first_name, last_name, email, password, role } = body;

        if (!first_name || !last_name) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }
        if (!email || !password) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        const current_user = await User.find({email});

        if (current_user) {
            throw new Error('User already exists');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password + PEPPER, salt);
        const user = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role
        });
        await user.save();
        return NextResponse.json(user);
    } catch (error) {
        console.log('[User_POST] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {
        await dbConnect();
        const users = await User.find({});

        return NextResponse.json(users);
    } catch (error) {
        console.log('[User_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}