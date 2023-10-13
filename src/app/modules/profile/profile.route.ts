import express from 'express';
import { USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ProfileController } from './profile.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ProfileValidation } from './profile.validation';
const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER, USER_ROLE.SUPER_ADMIN, USER_ROLE.TUTOR),
  ProfileController.getProfile
);

router.patch(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER, USER_ROLE.SUPER_ADMIN, USER_ROLE.TUTOR),
  validateRequest(ProfileValidation.updateProfileZodSchema),
  ProfileController.updateProfile
);

export const ProfileRoutes = router;
