import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { excludeField } from '../../../helpers/excludeField';
import { hashingHelper } from '../../../helpers/hashingHelpers';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUserResponse } from './auth.interface';

const createUser = async (payload: User): Promise<Partial<User> | null> => {
  const isExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  //Check if user already exist or not
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'User already exist');
  }

  //Encrypting the password
  const hashed_password = await hashingHelper.encrypt_password(
    payload.password
  );
  payload.password = hashed_password;

  //Creating the user
  const createdUser = await prisma.user.create({
    data: payload,
  });

  //Excluding the password field
  const userWithoutPassword = excludeField(createdUser, ['password']);
  return userWithoutPassword;
};
const loginUser = async (
  payload: Partial<User>
): Promise<ILoginUserResponse> => {
  const { email: mail, password: pass } = payload;

  //Checking if the user is deleted or not
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: mail,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //Checking if the password is correct or not
  const isPasswordMatched = await hashingHelper.match_password(
    pass as string,
    isUserExist.password
  );

  // console.log(isPasswordMatched, pass, isUserExist.password);

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { id, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { role, userId: id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { role, userId: id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

/* 
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  //Checking if the user is deleted or not
  const { _id } = verifiedToken;

  const isUserExist = await User.findById(_id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      _id: isUserExist._id,
      emial: isUserExist.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};
 */
export const AuthService = {
  createUser,
  loginUser,
  //   refreshToken,
};
