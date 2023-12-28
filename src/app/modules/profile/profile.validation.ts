import { z } from 'zod';

const updateProfileZodSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  // password: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
  // profileImg: z.any().optional(),
});

const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    NewPassword: z.string({
      required_error: 'New password is required',
    }),
  }),
});

export const ProfileValidation = {
  updateProfileZodSchema,
  changePasswordZodSchema,
};
