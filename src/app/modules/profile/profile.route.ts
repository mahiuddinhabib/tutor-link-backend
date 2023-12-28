import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLE } from '../../../enums/user';
import { fileUploadHelper } from '../../../helpers/fileUploadHelper';
import auth from '../../middlewares/auth';
import { ProfileController } from './profile.controller';
import { ProfileValidation } from './profile.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.get(
  '/',
  auth(
    USER_ROLE.ADMIN,
    USER_ROLE.CUSTOMER,
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.TUTOR
  ),
  ProfileController.getProfile
);

router.patch(
  '/',
  auth(
    USER_ROLE.ADMIN,
    USER_ROLE.CUSTOMER,
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.TUTOR
  ),
  fileUploadHelper.upload.single('profileImg'),
  (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body);
    req.body = ProfileValidation.updateProfileZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return ProfileController.updateProfile(req, res, next);
  }
  // validateRequest(ProfileValidation.updateProfileZodSchema),
  // ProfileController.updateProfile
);
router.patch(
  '/change-password',
  auth(
    USER_ROLE.ADMIN,
    USER_ROLE.CUSTOMER,
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.TUTOR
  ),
  validateRequest(ProfileValidation.updateProfileZodSchema),
  ProfileController.changePassword
);

export const ProfileRoutes = router;
