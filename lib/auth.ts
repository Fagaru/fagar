import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';

interface ExtendedNextApiRequest extends NextApiRequest {
    user?: any;
  }

export const authenticateToken = (handler: NextApiHandler) => {
  return async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded;
      return handler(req, res);
    } catch (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  };
};

export const authorize = (roles: string[], handler: NextApiHandler) => {
  return (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    return handler(req, res);
  };
};
