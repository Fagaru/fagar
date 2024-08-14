import User from "@/models/user.model";
import { NextResponse } from 'next/server';

export async function POST(
    req: Request
) {
    try {
        const body = await req.json();

        const filter = {_id: body.id};
        const user = await User.findOne(filter);
        if (!user) {
            return new NextResponse("Utiliseur non reconnu", { status: 401 });
        }
        const infoSession = await User.updateOne(
            filter, 
            {
                _id: body.id,
                lastLogout: Date.now(),
                updatedAt: Date.now()
            }
        );
        return NextResponse.json(infoSession);
    } catch (e) {
        console.log(e)
    }
}
