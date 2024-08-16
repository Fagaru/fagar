import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { withAuth } from "@/lib/auth";

const PEPPER = process.env.PEPPER || 'password par défaut'; // Utiliser une valeur secrète plus complexe en production

interface AuthenticatedRequest extends Request {
    user?: any; // Vous pouvez remplacer 'any' par le type de votre utilisateur si nécessaire
}

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

        // Se connecter à la base de données si ce n'est pas déjà fait
        await dbConnect();
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
    req: AuthenticatedRequest,
) {
    try {
        const authResponse = await withAuth(['admin'], req);
        if (authResponse) return authResponse;

        const users = await User.find().select(['-password']);

        return NextResponse.json(users);
    } catch (error) {
        console.log('[USERS_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}