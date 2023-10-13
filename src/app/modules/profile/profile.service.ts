import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { excludeField } from '../../../helpers/excludeField';
import prisma from '../../../shared/prisma';

const getProfile = async (
  user: JwtPayload | null
): Promise<Partial<User> | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: user?.userId,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const profileWithoutId = excludeField(result, ['id']);
  return profileWithoutId;
};

const updateProfile = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const ProfileService = {
  getProfile,
  updateProfile,
};
