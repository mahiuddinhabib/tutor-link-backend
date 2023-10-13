import { Request, RequestHandler, Response } from 'express';
import { Feedback } from '@prisma/client';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FeedbackService } from './feedback.service';

const createFeedback: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const feedback = req.body;
    const result = await FeedbackService.createFeedback(feedback, req.user);

    sendResponse<Feedback>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Feedback created successfully',
      data: result,
    });
  }
);

const getAllFeedbacks = catchAsync(async (req: Request, res: Response) => {
    const result = await FeedbackService.getAllFeedbacks();
    
    sendResponse<Feedback[]>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Feedbacks fetched successfully',
        data: result,
    });
});
const getSingleFeedback = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FeedbackService.getSingleFeedback(id);
    
    sendResponse<Feedback>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Feedback fetched successfully',
        data: result,
    });
});

const updateFeedback = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await FeedbackService.updateFeedback(id, updatedData, req.user);

  sendResponse<Feedback>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Feedback updated successfully',
    data: result,
  });
});

const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FeedbackService.deleteFeedback(id, req.user);

  sendResponse<Feedback>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Feedback deleted successfully',
    data: result,
  });
});
 
export const FeedbackController = {
createFeedback,
  getAllFeedbacks,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
};
