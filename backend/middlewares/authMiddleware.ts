import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

interface AuthenticatedRequest extends Request {
  user?: { userId: number; role: string };
}

export const authenticateAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token no proporcionado' });
  } else {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
      if (decoded.role !== 'admin') {
        res.status(403).json({ error: 'No autorizado' });
      } else {
        req.user = decoded;
        next();
      }
    } catch (error) {
      res.status(401).json({ error: 'Token inválido' });
    }
  }
};
