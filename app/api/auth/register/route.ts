import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User, { IUser, ROLES } from '@/models/user.model';
import dbConnect from '@/lib/dbConnect';

const PEPPER = process.env.PEPPER || 'your-secret-pepper';

export async function POST(
  req: Request
) {

  try {
    const body = await req.json();
    const { first_name, last_name, email, password, role, phone, birthday } = body;

  
    // await mongoose.connect(process.env.MONGO_URI!);
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
    return NextResponse.json(user);
  } catch (error) {
    console.log('[Register_POST] ', error);
    return new NextResponse("Internal error", { status: 500 });
  } 
}