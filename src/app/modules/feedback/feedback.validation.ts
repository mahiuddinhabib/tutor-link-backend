import { z } from 'zod';

const createFeedbackZodSchema = z.object({
  body: z.object({
    review: z.string({
      required_error: 'Review is required',
    }),
    rating: z
      .number({
        required_error: 'Rating is required',
      })
      .min(1, {
        message: 'invalid rating range',
      })
      .max(5, {
        message: 'invalid rating range',
      })
      .int({ message: 'rating must be integer' }),
    serviceId: z.string({
      required_error: 'serviceId is required',
    }),
  }),
});

const updateFeedbackZodSchema = z.object({
  body: z.object({
    review: z.string().optional(),
    rating: z
      .number()
      .min(1, {
        message: 'invalid rating range',
      })
      .max(5, {
        message: 'invalid rating range',
      })
      .int({ message: 'rating must be integer' })
      .optional(),
  }),
});

export const FeedbackValidation = {
  createFeedbackZodSchema,
  updateFeedbackZodSchema,
};
