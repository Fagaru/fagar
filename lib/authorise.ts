import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

interface ExtendedNextApiRequest extends NextApiRequest {
  user?: any
}

export const authorize = (allowedRoles: string[], handler: NextApiHandler) => {
  return async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthenticated' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    return handler(req, res);
  };
};
