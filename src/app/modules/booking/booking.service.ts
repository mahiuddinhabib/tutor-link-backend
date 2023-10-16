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
        availableService: {
          include: {
            service: true
          },
        },
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
        availableService: {
          include: {
            service: true
          },
        },
      },
    });
  }
  return bookings;
};

const getAllPastBookings = async (
  user: JwtPayload | null
): Promise<Partial<Booking>[] | null> => {
  let pastBookings;
  if (user?.role === USER_ROLE.ADMIN) {
    pastBookings = await prisma.pastBooking.findMany();
  } else {
    pastBookings = await prisma.pastBooking.findMany({
      where: {
        userId: {
          equals: user?.userId,
        },
      },
    });
  }
  return pastBookings;
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
      await trx.pastBooking.create({
        data: {
          status: 'rejected',
          userId: updatedBooking.userId,
          availableServiceId: updatedBooking.availableServiceId,
        },
      });
      await trx.booking.delete({
        where: {
          id,
        },
      });
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to update status');
    }
    // console.log(updatedBooking, pastBooking);
    return updatedBooking;
  });

  return updatedResult;
};

const cancelOrCompleteBooking = async (
  id: string,
  user: JwtPayload | null,
  updatedStatus: string
): Promise<Partial<Booking> | null> => {
  const isExist = await prisma.booking.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  if (user?.userId !== isExist?.userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'forbidden');
  }

  const updatedResult = await prisma.$transaction(async trx => {
    let deletedBooking;
    if (
      (isExist.status === 'pending' && updatedStatus === 'cancelled') ||
      (isExist.status === 'approved' && updatedStatus === 'completed')
    ) {
      await trx.availableService.update({
        where: {
          id: isExist.availableServiceId,
        },
        data: {
          isBooked: false,
        },
      });

      await trx.booking.delete({
        where: {
          id,
        },
      });

      deletedBooking = await trx.pastBooking.create({
        data: {
          status: updatedStatus,
          userId: isExist.userId,
          availableServiceId: isExist.availableServiceId,
        },
      });
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to update booking');
    }

    return deletedBooking;
  });

  return updatedResult;
};

export const BookingService = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBookingStatus,
  cancelOrCompleteBooking,
  getAllPastBookings,
};
