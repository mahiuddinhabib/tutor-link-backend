import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidation } from './service.validation';
import { ServiceController } from './service.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../enums/user';
import { fileUploadHelper } from '../../../helpers/fileUploadHelper';
const router = express.Router();

router.post(
  '/create-service',
  auth(USER_ROLE.ADMIN),
  fileUploadHelper.upload.single('coverImg'),

  (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body);
    req.body = ServiceValidation.createServiceZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return ServiceController.createService(req, res, next);
  }

  // validateRequest(ServiceValidation.createServiceZodSchema),
  // ServiceController.createService
);

router.get('/', ServiceController.getAllServices);

router.get('/:id', ServiceController.getSingleService);

router.get('/:id/subject', ServiceController.getServicesBySubject);

router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN),
  validateRequest(ServiceValidation.updateServiceZodSchema),
  ServiceController.updateService
  );

  router.delete('/:id', auth(USER_ROLE.ADMIN), ServiceController.deleteService);


export const ServiceRoutes = router;
