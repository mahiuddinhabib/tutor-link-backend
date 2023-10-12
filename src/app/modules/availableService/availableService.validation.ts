import { z } from 'zod';

const createAvailableServiceZodSchema = z.object({
  body: z.object({
    serviceId: z.string({
      required_error: 'ServiceId is required',
    }),
    startTime: z.string({
      required_error: 'Start time is required',
    }),
    isBooked: z.boolean().optional(),
  }),
});

const updateAvailableServiceZodSchema = z.object({
  body: z.object({
    startTime: z.string().optional(),
    serviceId: z.string().optional(),
    isBooked: z.boolean().optional(),
  }),
});

export const AvailableServiceValidation = {
  createAvailableServiceZodSchema,
  updateAvailableServiceZodSchema,
};
