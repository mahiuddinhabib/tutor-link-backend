import { z } from 'zod';

const createServiceZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    tutorId: z.string({
      required_error: 'Tutor id is required',
    }),
    price: z.union([z.string(), z.number()],{
      required_error: "Price is required"
    }),
    subjectId: z.string({
      required_error: 'Subject id is required',
    }),
  }),
});

const updateServiceZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    tutorId: z.string().optional(),
    price: z.union([z.string(), z.number()]).optional(),
    subjectId: z.string().optional(),
  }),
});

export const ServiceValidation = {
  createServiceZodSchema,
  updateServiceZodSchema,
};
