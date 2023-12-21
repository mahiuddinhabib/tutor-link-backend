import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { excludeField } from '../../../helpers/excludeField';
import { fileUploadHelper } from '../../../helpers/fileUploadHelper';
import { ICloudinaryResponse, IUploadFile } from '../../../interfaces/file';
import prisma from '../../../shared/prisma';
import { hashingHelper } from '../../../helpers/hashingHelpers';

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

  //Check if user exist or not
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  //If password is updated then encrypt it
  if (updatedUserData.password) {
    const hashed_password = await hashingHelper.encrypt_password(
      updatedUserData.password
    );
    updatedUserData.password = hashed_password;
  }

  //If file uploaded then upload to cloudinary
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
