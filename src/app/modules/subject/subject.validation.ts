import { z } from 'zod';

const createSubjectZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

const updateSubjectZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const SubjectValidation = {
    createSubjectZodSchema,
    updateSubjectZodSchema
}
