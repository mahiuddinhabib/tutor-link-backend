import { AvailableService } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createAvailableService = async (
  payload: AvailableService
): Promise<AvailableService | null> => {
  const createdAvailableService = await prisma.availableService.create({
    data: payload,
    include: {
      service: true,
    },
  });
  return createdAvailableService;
};

const getAllAvailableServices = async (): Promise<
  AvailableService[] | null
> => {
  const availableServices = await prisma.availableService.findMany({
    include:{
      service: true
    }
  });
  return availableServices;
};

const getSingleAvailableService = async (
  id: string
): Promise<AvailableService | null> => {
  const result = await prisma.availableService.findUnique({
    include:{
      service:true
    },
    where: {
      id,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Available service not found');
  }
  return result;
};

const updateAvailableService = async (
  id: string,
  payload: Partial<AvailableService>
): Promise<AvailableService | null> => {
  const isExist = await prisma.availableService.findUnique({
    include:{
      service: true
    },
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Available service not found !');
  }

  const result = await prisma.availableService.update({
    include:{
      service: true
    },
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteAvailableService = async (
  id: string
): Promise<AvailableService | null> => {
  const isExist = await prisma.availableService.findUnique({
    include:{
      service:true
    },
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Available service not found');
  }

  const result = await prisma.availableService.delete({
    where: {
      id,
    },
  });
  return result;
};

export const AvailableServiceService = {
  createAvailableService,
  getAllAvailableServices,
  getSingleAvailableService,
  updateAvailableService,
  deleteAvailableService,
};
