import { Response } from 'express';
import jwt from 'jsonwebtoken';

export type TokenPayload = {
  userId: string;
  name: string;
  role: string;
};

export const createJWT = (payload: TokenPayload) => {
  if (!process.env.JWT_SECRET) return;

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

export const isTokenValid = (token: string) => {
  if (!process.env.JWT_SECRET) return;

  return jwt.verify(token, process.env.JWT_SECRET);
};

export const attachCookiesToResponse = (
  res: Response,
  payload: TokenPayload
) => {
  const token = createJWT(payload);

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};
