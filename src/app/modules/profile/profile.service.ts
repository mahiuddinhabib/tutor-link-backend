import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { excludeField } from '../../../helpers/excludeField';
import { fileUploadHelper } from '../../../helpers/fileUploadHelper';
import { hashingHelper } from '../../../helpers/hashingHelpers';
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
  const profileWithoutIdPassword = excludeField(result, ['password']);
  return profileWithoutIdPassword;
};

const updateProfile = async (
  id: string,
  updatedUserData: Partial<User>,
  file?: IUploadFile
): Promise<Partial<User> | null> => {
  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  //Check if user exist or not
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  //Remove password field as it is not allowed to update password here
  if (updatedUserData.password) {
    delete updatedUserData.password;
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

  const profileWithoutIdPassword = excludeField(result, ['password']);
  return profileWithoutIdPassword;
};

const changePassword = async (
  id: string,
  payload: { oldPassword: string; newPassword: string }
): Promise<Partial<User> | null> => {
  const { oldPassword, newPassword } = payload;

  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  //Check if user exist or not
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  //Checking if the old password is correct or not
  const isPasswordMatched = await hashingHelper.match_password(
    oldPassword,
    isExist.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  const hashed_password = await hashingHelper.encrypt_password(newPassword);

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: hashed_password,
    },
  });

  const profileWithoutIdPassword = excludeField(result, ['password']);
  return profileWithoutIdPassword;
};

export const ProfileService = {
  getProfile,
  updateProfile,
  changePassword,
};
