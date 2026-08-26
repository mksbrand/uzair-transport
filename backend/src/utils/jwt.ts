import jwt from 'jsonwebtoken';
import env from '../config/env';
import { UserPayload } from '../types';

export const generateToken = (payload: UserPayload, expiresIn: string = '7d'): string => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: expiresIn as any });
};

export const verifyToken = (token: string): UserPayload => {
  return jwt.verify(token, env.JWT_SECRET) as UserPayload;
};

export const generateSignedToken = (payload: object): string => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '180d' });
};
