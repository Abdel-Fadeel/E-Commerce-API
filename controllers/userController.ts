import { Request, Response } from 'express';

export const getAllUsers = async (req: Request, res: Response) => {
  res.send('getAllUsers');
};
export const getSingleUser = async (req: Request, res: Response) => {
  res.send('getSingleUser');
};
export const showCurrentUser = async (req: Request, res: Response) => {
  res.send('showCurrentUser');
};
export const updateUser = async (req: Request, res: Response) => {
  res.send('updateUser');
};
export const updateUserPassword = async (req: Request, res: Response) => {
  res.send('updateUserPassword');
};
