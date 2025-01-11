import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../custom';

interface TokenPayload {
  id: number;
  email: string;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1]; // Extrai o token do formato "Bearer <token>"

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default_secret',
    ) as TokenPayload;

    // Adiciona os dados do token no objeto `req`
    req.user = { id: decoded.id, email: decoded.email };
  } catch (err) {
    console.error(err);
    return res.status(403).json({ error: 'Token inválido.' });
  }
};
