import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { withAuth } from "@/lib/auth";
import { createCorsResponse } from "@/lib/createCorsResponse";

const PEPPER = process.env.PEPPER || 'password par défaut'; // Utiliser une valeur secrète plus complexe en production

interface AuthenticatedRequest extends Request {
    user?: any; // Vous pouvez remplacer 'any' par le type de votre utilisateur si nécessaire
}

export async function POST(
    req: AuthenticatedRequest
) {
    try {
        const body = await req.json();

        const authResponse = await withAuth(['admin'], req);
        let init_password: boolean = false;
        if (!authResponse) {
            body.password = "123456";
            init_password = true;
        }

        const { first_name, last_name, email, password } = body;


        if (!first_name || !last_name) {
            return createCorsResponse("Veuillez remplir le formulaire", { status: 403 });
        }
        if (!email || !password) {
            return createCorsResponse("Veuillez remplir le formulaire", { status: 403 });
        }

        // Se connecter à la base de données si ce n'est pas déjà fait
        await dbConnect();
        const current_user = await User.findOne({email});

        if (current_user) {
            return createCorsResponse("Cet utilisateur existe déjà.", { status: 409 });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password + PEPPER, salt);

        const user = new User({
            ...body,
            password: hashedPassword,
        });
        await user.save();
        return createCorsResponse(user);
    } catch (error) {
        console.log('[User_POST] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: AuthenticatedRequest,
) {
    try {
        const authResponse = await withAuth(['admin'], req);
        if (authResponse) return authResponse;

        // Se connecter à la base de données si ce n'est pas déjà fait
        await dbConnect();
        const users = await User.find().select(['-password']);

        return createCorsResponse(users);
    } catch (error) {
        console.log('[USERS_GET] ', error);
        return createCorsResponse("Internal error", { status: 500 });
    }
}