import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { excludeField } from '../../../helpers/excludeField';
import { fileUploadHelper } from '../../../helpers/fileUploadHelper';
import { ICloudinaryResponse, IUploadFile } from '../../../interfaces/file';
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
  updatedUserData: Partial<User>,
  file?: IUploadFile
): Promise<User | null> => {
  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  // console.log(file);

  if (file) {
    const uploadedImg = (await fileUploadHelper.uploadToCloudinary(
      file
    )) as ICloudinaryResponse;
    // console.log(uploadedImg);
    updatedUserData.profileImg = uploadedImg.secure_url;
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: updatedUserData,
  });
  return result;
};

export const ProfileService = {
  getProfile,
  updateProfile,
};
