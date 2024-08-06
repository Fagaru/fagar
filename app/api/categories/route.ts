import { NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import Category from "@/models/category.model";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticateToken, authorize } from "@/lib/auth";

// Types d'utilisateurs autorisés
const allowedRolesForPOST = ['admin'];
const allowedRolesForGET = ['admin', 'professional', 'visitor', 'anonymous'];

interface ExtendedNextApiRequest extends NextApiRequest {
    user?: {
      id: string;
      role: string;
    };
  }

export async function POST(
    req: Request
) {
    try {
        // const { userId } = auth();

        const body = await req.json();

        const { label, imageUrl } = body;

        console.log("POST CATEGORY", body)

        // if (!userId) {
        //     return new NextResponse("Unauthenticated", { status: 401 });
        // }

        if (!label) {
            return new NextResponse("Label is required", {  status: 400});
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", {  status: 400});
        }

        // const storeByUserId = await prismadb.store.findFirst({
        //     where: {
        //         id: params.storeId,
        //         userId
        //     }
        // });

        // if (!storeByUserId) {
        //     return new NextResponse("Unauthorized", {  status: 403});
        // }

        await dbConnect();
        const category = new Category({
            label,
            imageUrl
        });

        await category.save();
        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORY_POST] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {
        await dbConnect();
        const categories = await Category.find({});

        return NextResponse.json(categories);
    } catch (error) {
        console.log('[CATEGORY_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

// // Utilisez authenticateToken et authorize comme middleware pour protéger les routes
// export default (req: ExtendedNextApiRequest, res: NextApiResponse) => {
//     if (req.method === 'POST') {
//       return authenticateToken(authorize(allowedRolesForPOST, POST))(req, res);
//     } else if (req.method === 'GET') {
//       return authenticateToken(authorize(allowedRolesForGET, GET))(req, res);
//     } else {
//       res.setHeader('Allow', ['POST', 'GET']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// };