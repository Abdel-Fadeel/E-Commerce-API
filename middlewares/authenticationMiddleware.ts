import { Handler } from 'express';
import { UnauthenticatedError } from '../utils/customErrors.js';
import { TokenPayload, isTokenValid } from '../utils/jwt.js';

export const authenticateUser: Handler = async (req: any, res, next) => {
  const { token } = req.signedCookies;
  if (!token) throw new UnauthenticatedError('Authentication failed');

  const payload = isTokenValid(token);
  if (!payload) throw new UnauthenticatedError('Authentication failed');

  const { name, userId, role } = payload as TokenPayload;

  req.user = { name, userId, role };
  next();
};
