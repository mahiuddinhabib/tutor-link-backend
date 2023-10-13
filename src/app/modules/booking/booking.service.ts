import { Booking } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
// import { asyncForEach } from '../../../shared/utils';
// import { IBookingCreateData } from './booking.interface';

const createBooking = async (
  user: JwtPayload | null,
  availableServiceId: string
): Promise<Booking | null> => {
  const createdBooking = await prisma.booking.create({
    data: { userId: user?.userId, availableServiceId },
    include: {
      availableService: true,
    },
  });
  return createdBooking;
};

const getAllBookings = async (
  user: JwtPayload | null
): Promise<Booking[] | null> => {
  let bookings;
  if (user?.role === USER_ROLE.ADMIN) {
    bookings = await prisma.booking.findMany({
      include: {
        availableService: true,
      },
    });
  } else {
    bookings = await prisma.booking.findMany({
      where: {
        userId: {
          equals: user?.userId,
        },
      },
      include: {
        availableService: true,
      },
    });
  }
  return bookings;
};

const getSingleBooking = async (
  user: JwtPayload | null,
  id: string
): Promise<Booking | null> => {
  const booking = await prisma.booking.findUnique({
    where: {
      id,
    },
    include: {
      availableService: true,
    },
  });

  if (
    user?.role === USER_ROLE.ADMIN ||
    (user?.role === USER_ROLE.CUSTOMER && user?.userId === booking?.userId)
  ) {
    return booking;
  } else {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
};

const updateBookingStatus = async (
  id: string,
  updatedStatus: string
): Promise<Booking | null> => {
  const updatedResult = await prisma.$transaction(async trx => {
    const updatedBooking = await trx.booking.update({
      where: {
        id,
      },
      data: {
        status: updatedStatus,
      },
    });

    if (!updatedBooking) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to update status');
    }

    if (updatedStatus === 'approved') {
      await trx.availableService.update({
        where: {
          id: updatedBooking?.availableServiceId,
        },
        data: {
          isBooked: true,
        },
      });
    } else if (updatedStatus === 'rejected') {
      await trx.booking.delete({
        where: {
          id,
        },
      });
    }
    return updatedBooking;
  });

  if (updatedResult) {
    const result = await prisma.booking.findUnique({
      where: {
        id,
      },
    });
    return result;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to update status');
  }
};

export const BookingService = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBookingStatus,
};
