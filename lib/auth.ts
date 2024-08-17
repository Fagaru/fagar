import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/user.model'; // Assurez-vous d'importer correctement votre modèle utilisateur
import dbConnect from '@/lib/dbConnect'; // Importez votre fonction de connexion à la base de données

// Interface pour le payload du JWT
interface JwtPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

interface AuthenticatedRequest extends Request {
  user?: any; // Vous pouvez remplacer 'any' par le type de votre utilisateur si nécessaire
}

export const withAuth = async (roles: string | string[], req: AuthenticatedRequest): Promise<NextResponse | null> => {
  try {
    // Extraire le token du header Authorization
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return new NextResponse('Accès refusé. Veuillez vous authentifier !', { status: 401 });
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = { userId: decoded.userId } as any; // Stocker les informations du token dans req.user

    // Se connecter à la base de données si ce n'est pas déjà fait
    await dbConnect();

    // Rechercher l'utilisateur dans la base de données par son ID
    const user = await User.findById(decoded.userId).select(['-password']);
    if (!user) {
      return new NextResponse('Utilisateur introuvable.', { status: 404 });
    }

    // Vérifier si l'utilisateur a l'un des rôles autorisés
    const hasRole = Array.isArray(roles) ? roles.includes(user.role) : user.role === roles;
    if (!hasRole) {
      return new NextResponse('Accès refusé. Vous n\'avez pas le bon rôle.', { status: 403 });
    }

    // Ajouter l'utilisateur à la requête pour un accès ultérieur
    req.user = user;

    // Retourner null pour indiquer qu'il n'y a pas d'erreur
    return null;
  } catch (error) {
    console.error('Erreur dans withAuth:', error);
    return new NextResponse('Token invalide ou expiré. Veuillez vous authentifier !', { status: 401 });
  }
};
