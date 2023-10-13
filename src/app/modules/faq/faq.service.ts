import { FAQ } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createFAQ = async (payload: FAQ): Promise<FAQ | null> => {
  const createdFAQ = await prisma.fAQ.create({
    data: payload,
  });
  return createdFAQ;
};

const getAllFAQs = async (): Promise<FAQ[] | null> => {
  const FAQs = await prisma.fAQ.findMany();
  return FAQs;
};

const getSingleFAQ = async (id: string): Promise<FAQ | null> => {
  const result = await prisma.fAQ.findUnique({
    where: {
      id,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FAQ not found');
  }
  return result;
};

const updateFAQ = async (
  id: string,
  payload: Partial<FAQ>
): Promise<FAQ | null> => {
  const isExist = await prisma.fAQ.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FAQ not found !');
  }

  const result = await prisma.fAQ.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteFAQ = async (id: string): Promise<FAQ | null> => {
  const isExist = await prisma.fAQ.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FAQ not found');
  }

  const result = await prisma.fAQ.delete({
    where: {
      id,
    },
  });
  return result;
};

export const FAQService = {
  createFAQ,
  getAllFAQs,
  getSingleFAQ,
  updateFAQ,
  deleteFAQ,
};
