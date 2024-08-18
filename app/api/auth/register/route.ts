import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import User, { IUser, ROLES } from '@/models/user.model';
import dbConnect from '@/lib/dbConnect';
import { createCorsResponse } from "@/lib/createCorsResponse";

const PEPPER = process.env.PEPPER || 'your-secret-pepper';

export async function POST(
  req: Request
) {

  try {
    const body = await req.json();
    const { first_name, last_name, email, password, role, phone, birthday } = body;
    
    await dbConnect();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password + PEPPER, salt);
    const user = new User({
      first_name,
      last_name,
      phone,
      birthday,
      email,
      password: hashedPassword,
      role
    });
    await user.save();
    return createCorsResponse(user);
  } catch (error) {
    console.log('[Register_POST] ', error);
    return createCorsResponse("Internal error", { status: 500 });
  } 
}