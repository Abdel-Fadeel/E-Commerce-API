import jwt from 'jsonwebtoken';

type TokenPayload = {
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
