import { Prisma, Service } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  serviceRelationalFields,
  serviceSearchableFields,
} from './service.constant';
import { IServiceFilterableField } from './service.interface';

const createService = async (payload: Service): Promise<Service | null> => {
  const createdService = await prisma.service.create({
    data: payload,
    include: {
      tutor: true,
      subject: true,
    },
  });
  return createdService;
};

const getAllServices = async (
  filters: IServiceFilterableField,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  
  const totalService = await prisma.service.count();
  // console.log(totalService);

  const { limit:size , ...rest} = paginationOptions;

  if(!size){
    paginationOptions = {limit: totalService, ...rest};
  }

  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { search, minPrice, maxPrice, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: serviceSearchableFields.map(field => {
        if (serviceRelationalFields.includes(field)) {
          return {
            [field]: {
              title: {
                contains: search,
                mode: 'insensitive',
              },
            },
          };
        } else {
          return {
            [field]: {
              contains: search,
              mode: 'insensitive',
            },
          };
        }
      }),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (serviceRelationalFields.includes(key)) {
          return {
            [key]: {
              title: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  if (minPrice) {
    const minP = parseFloat(minPrice);
    andConditions.push({ price: { gte: minP } });
  }

  if (maxPrice) {
    const maxP = parseFloat(maxPrice);
    andConditions.push({ price: { lte: maxP } });
  }

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.service.findMany({
    include: {
      tutor: true,
      subject: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : {
            title: 'asc',
          },
  });
  const total = await prisma.service.count({
    where: whereConditions,
  });

  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

const getServicesBySubject = async (id: string): Promise<Service[]> => {
  const result = await prisma.service.findMany({
    where: {
      subjectId: id,
    },
    include: {
      tutor: true,
      subject: true,
    },
  });
  return result;
};

const getSingleService = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }
  return result;
};

const updateService = async (
  id: string,
  payload: Partial<Service>
): Promise<Service | null> => {
  const isExist = await prisma.service.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found !');
  }

  const result = await prisma.service.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteService = async (id: string): Promise<Service | null> => {
  const isExist = await prisma.service.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }

  const result = await prisma.service.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ServiceService = {
  createService,
  getAllServices,
  getSingleService,
  getServicesBySubject,
  updateService,
  deleteService,
};
