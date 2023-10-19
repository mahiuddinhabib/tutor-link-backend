import { Feedback } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createFeedback = async (
  payload: Feedback,
  user: JwtPayload | null
): Promise<Feedback | null> => {
  const createdFeedback = await prisma.feedback.create({
    data: { ...payload, userId: user?.userId },
  });
  return createdFeedback;
};

const getAllFeedbacks = async (): Promise<Feedback[] | null> => {
  const feedbacks = await prisma.feedback.findMany({
    include: {
      user: true,
      service: true,
    },
  });
  return feedbacks;
};

const getSingleFeedback = async (id: string): Promise<Feedback | null> => {
  const result = await prisma.feedback.findUnique({
    where: {
      id,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
  }
  return result;
};

const updateFeedback = async (
  id: string,
  payload: Partial<Feedback>,
  user: JwtPayload | null
): Promise<Feedback | null> => {
  const isExist = await prisma.feedback.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found !');
  }

  if (isExist.userId !== user?.userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'forbidden');
  }

  const result = await prisma.feedback.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteFeedback = async (
  id: string,
  user: JwtPayload | null
): Promise<Feedback | null> => {
  const isExist = await prisma.feedback.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
  }

  if (isExist.userId !== user?.userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'forbidden');
  }

  const result = await prisma.feedback.delete({
    where: {
      id,
    },
  });
  return result;
};

export const FeedbackService = {
  createFeedback,
  getAllFeedbacks,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
};
