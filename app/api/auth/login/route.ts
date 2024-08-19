import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '@/models/user.model';
import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import { createCorsResponse } from '@/lib/createCorsResponse';

const PEPPER = process.env.PEPPER || 'your-secret-pepper';
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(
  req: Request
) {
    try {
      const { email, password } = await req.json();

      await dbConnect();

      const user = await User.findOne({ email });
      if (!user) {
        return createCorsResponse("Identifiants invalides", { status: 404 });
      }

      const isMatch = await bcrypt.compare(password + PEPPER, user.password);

      if (!isMatch) {
        return createCorsResponse("Identifiants invalides", { status: 403 });
      }

      const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

      const filter = {_id: user._id};
      await User.updateOne(
          filter, 
          {
            _id: user._id, 
            lastLogin: Date.now(),
            updatedAt: Date.now()
          }
      );

      let userInfo: any = {
        id: user._id,
        lastLogin: user.lastLogin,
        role: user.role,
        isVerified: user.isVerified,
        isActive: user.isActive,
        isSuspended: user.isSuspended
      }

      return createCorsResponse({userInfo, token});
    } catch (error) {
      return createCorsResponse("Internal error", { status: 500 });
    }
}
