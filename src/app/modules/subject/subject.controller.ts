import { Request, RequestHandler, Response } from 'express';
import { Subject } from '@prisma/client';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SubjectService } from './subject.service';

const createSubject: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const subject = req.body;
    const result = await SubjectService.createSubject(subject);

    sendResponse<Subject>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Subject created successfully',
      data: result,
    });
  }
);

const getAllSubjects = catchAsync(async (req: Request, res: Response) => {
    const result = await SubjectService.getAllSubjects();
    
    sendResponse<Subject[]>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Subjects fetched successfully',
        data: result,
    });
});
const getSingleSubject = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SubjectService.getSingleSubject(id);
    
    sendResponse<Subject>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Subject fetched successfully',
        data: result,
    });
});

const updateSubject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await SubjectService.updateSubject(id, updatedData);

  sendResponse<Subject>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Subject updated successfully',
    data: result,
  });
});

const deleteSubject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SubjectService.deleteSubject(id);

  sendResponse<Subject>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Subject deleted successfully',
    data: result,
  });
});
 
export const SubjectController = {
createSubject,
  getAllSubjects,
  getSingleSubject,
  updateSubject,
  deleteSubject,
};
