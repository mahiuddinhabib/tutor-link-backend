import { z } from 'zod';
import { bookingStatus } from './booking.constant';

const createBookingZodSchema = z.object({
  body: z.object({
    availableServiceId: z.string({
      required_error: 'ServiceId is required',
    }),
  }),
});

const updateBookingStatusZodSchema = z.object({
  body: z.object({
    status: z.enum([...bookingStatus] as [string, ...string[]], {
      required_error: 'Status is required',
    }),
  }),
});

export const BookingValidation = {
  createBookingZodSchema,
  updateBookingStatusZodSchema,
};
