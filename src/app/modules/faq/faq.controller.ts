import { Request, RequestHandler, Response } from 'express';
import { FAQ } from '@prisma/client';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FAQService } from './faq.service';

const createFAQ: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const faq = req.body;
    const result = await FAQService.createFAQ(faq);

    sendResponse<FAQ>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'FAQ created successfully',
      data: result,
    });
  }
);

const getAllFAQs = catchAsync(async (req: Request, res: Response) => {
    const result = await FAQService.getAllFAQs();
    
    sendResponse<FAQ[]>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'FAQs fetched successfully',
        data: result,
    });
});
const getSingleFAQ = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FAQService.getSingleFAQ(id);
    
    sendResponse<FAQ>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'FAQ fetched successfully',
        data: result,
    });
});

const updateFAQ = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await FAQService.updateFAQ(id, updatedData);

  sendResponse<FAQ>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'FAQ updated successfully',
    data: result,
  });
});

const deleteFAQ = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FAQService.deleteFAQ(id);

  sendResponse<FAQ>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'FAQ deleted successfully',
    data: result,
  });
});
 
export const FAQController = {
createFAQ,
  getAllFAQs,
  getSingleFAQ,
  updateFAQ,
  deleteFAQ,
};
