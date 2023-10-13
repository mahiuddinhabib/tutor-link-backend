import { Booking } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookingService } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.createBooking(
    req.user,
    req.body?.availableServiceId
  );
  sendResponse<Booking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookings(req.user);

  sendResponse<Booking[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings fetched successfully',
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingService.getSingleBooking(req.user, id);

  sendResponse<Booking>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking fetched successfully',
    data: result,
  });
});

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedStatus = req.body?.status;

  const result = await BookingService.updateBookingStatus(id, updatedStatus);

  sendResponse<Booking>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Status updated successfully',
    data: result,
  });
});

const cancelOrCompleteBooking = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedStatus = req.body?.status;

    const result = await BookingService.cancelOrCompleteBooking(
      id,
      req.user,
      updatedStatus
    );

    sendResponse<Partial<Booking>>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Booking completed/cancelled successfully',
      data: result,
    });
  }
);

export const BookingController = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBookingStatus,
  cancelOrCompleteBooking,
};
