import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AvailableServiceValidation } from './availableService.validation';
import { AvailableServiceController } from './availableService.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/create-available-service',
  auth(USER_ROLE.ADMIN),
  validateRequest(AvailableServiceValidation.createAvailableServiceZodSchema),
  AvailableServiceController.createAvailableService
);
router.get('/', AvailableServiceController.getAllAvailableServices);

router.get('/:id', AvailableServiceController.getSingleAvailableService);


router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN),
  validateRequest(AvailableServiceValidation.updateAvailableServiceZodSchema),
  AvailableServiceController.updateAvailableService
);

router.delete('/:id', auth(USER_ROLE.ADMIN), AvailableServiceController.deleteAvailableService);

export const AvailableServiceRoutes = router;
