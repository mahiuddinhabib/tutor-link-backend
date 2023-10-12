import { Request, RequestHandler, Response } from 'express';
import { AvailableService } from '@prisma/client';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AvailableServiceService } from './availableService.service';

const createAvailableService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const availableService = req.body;
    const result = await AvailableServiceService.createAvailableService(availableService);

    sendResponse<AvailableService>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Available service created successfully',
      data: result,
    });
  }
);

const getAllAvailableServices = catchAsync(async (req: Request, res: Response) => {
    const result = await AvailableServiceService.getAllAvailableServices();
    
    sendResponse<AvailableService[]>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Available services fetched successfully',
        data: result,
    });
});
const getSingleAvailableService = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AvailableServiceService.getSingleAvailableService(id);
    
    sendResponse<AvailableService>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Available service fetched successfully',
        data: result,
    });
});

const updateAvailableService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await AvailableServiceService.updateAvailableService(id, updatedData);

  sendResponse<AvailableService>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Available service updated successfully',
    data: result,
  });
});

const deleteAvailableService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AvailableServiceService.deleteAvailableService(id);

  sendResponse<AvailableService>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'AvailableService deleted successfully',
    data: result,
  });
});
 
export const AvailableServiceController = {
createAvailableService,
  getAllAvailableServices,
  getSingleAvailableService,
  updateAvailableService,
  deleteAvailableService,
};
