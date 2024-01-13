import { Handler, NextFunction, Response } from 'express';
import {
  UnauthenticatedError,
  UnauthorizedError,
} from '../utils/customErrors.js';
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

export const authorizePermissions = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role))
      throw new UnauthorizedError('Unauthorized to access this route');
    next();
  };
};
