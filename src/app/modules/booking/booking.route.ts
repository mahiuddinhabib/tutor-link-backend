import express from 'express';
import { USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validate';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
  BookingController.getAllBookings
);

router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
  BookingController.getSingleBooking
);

router.post(
  '/create-booking',
  validateRequest(BookingValidation.createBookingZodSchema),
  auth(USER_ROLE.CUSTOMER),
  BookingController.createBooking
);


router.patch(
  '/:id',
  validateRequest(BookingValidation.updateBookingStatusZodSchema),
  auth(USER_ROLE.ADMIN),
  BookingController.updateBookingStatus
);

router.delete(
  '/:id',
  validateRequest(BookingValidation.updateBookingStatusZodSchema),
  auth(USER_ROLE.CUSTOMER),
  BookingController.cancelOrCompleteBooking
);

export const BookingRoutes = router;
