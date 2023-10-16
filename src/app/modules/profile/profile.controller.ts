import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getProfile(req.user);

  sendResponse<Partial<User>>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req.user?.userId;
  const updatedData = req.body;

  const result = await ProfileService.updateProfile(id, updatedData);

  sendResponse<Partial<User>>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile updated successfully',
    data: result,
  });
});

export const ProfileController = {
  getProfile,
  updateProfile
};