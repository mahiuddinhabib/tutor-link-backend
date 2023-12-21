import { z } from 'zod';

const updateProfileZodSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
  // profileImg: z.any().optional(),
});

export const ProfileValidation = {
  updateProfileZodSchema,
};
