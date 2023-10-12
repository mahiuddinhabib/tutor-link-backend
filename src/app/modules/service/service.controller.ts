import { Service } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ServiceService } from './service.service';
import { serviceFilterableFields } from './service.constant';

const createService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const service = req.body;
    const result = await ServiceService.createService(service);

    sendResponse<Service>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Service created successfully',
      data: result,
    });
  }
);
const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ServiceService.getAllServices(filters, paginationOptions);
  sendResponse<Service[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getServicesBySubject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ServiceService.getServicesBySubject(id, paginationOptions);

  sendResponse<Service[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services with associated subject data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceService.getSingleService(id);

  sendResponse<Service>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service fetched successfully',
    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await ServiceService.updateService(id, updatedData);

  sendResponse<Service>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service updated successfully',
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceService.deleteService(id);

  sendResponse<Service>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service deleted successfully',
    data: result,
  });
});

export const ServiceController = {
  createService,
  getAllServices,
  getSingleService,
  getServicesBySubject,
  updateService,
  deleteService,
};
