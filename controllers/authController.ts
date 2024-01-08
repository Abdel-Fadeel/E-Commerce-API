import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from '../utils/customErrors.js';
import { attachCookiesToResponse } from '../utils/jwt.js';

// Register New User
export const register: Handler = async (req, res) => {
  const { name, email, password } = req.body;
  // Check for existing emails
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) throw new BadRequestError('Email already exists');
  // Set role dynamically (first registered user is an admin)
  const isFirstAccount = (await User.countDocuments()) === 0;
  const role = isFirstAccount ? 'admin' : 'user';
  // Create User
  const user = await User.create({ name, email, password, role });
  // Create Token and send it via cookies
  const tokenUser = { name: user.name, userId: user.id, role: user.role };
  attachCookiesToResponse(res, tokenUser);

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

// Login User
export const login: Handler = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError('Please provide email and password');

  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError('Invalid credentials');

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new UnauthenticatedError('Invalid credentials');

  const tokenUser = { name: user.name, userId: user.id, role: user.role };
  attachCookiesToResponse(res, tokenUser);

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

// Logout User
export const logout: Handler = async (req, res) => {};
