import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export function verificarToken(req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>> {
  const token = req.headers.authorization;

  if (!token || token !== process.env.TOKEN) {
    return res.status(401).json({ message: 'Acesso não autorizado.' });
  }
  next();
}
