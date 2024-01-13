import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { NotFoundError } from '../utils/customErrors.js';

export const getAllUsers = async (req: any, res: Response) => {
  console.log(req.user);
  const users = await User.find({ role: 'user' }).select('-password');

  res.status(StatusCodes.OK).json({ users });
};
export const getSingleUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) throw new NotFoundError(`No user with id: ${req.params.id}`);

  res.status(StatusCodes.OK).json({ user });
};
export const showCurrentUser = async (req: any, res: Response) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};
export const updateUser = async (req: Request, res: Response) => {
  res.send('updateUser');
};
export const updateUserPassword = async (req: Request, res: Response) => {
  res.send('updateUserPassword');
};
