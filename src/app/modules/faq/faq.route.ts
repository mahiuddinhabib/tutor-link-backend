import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FAQValidation } from './faq.validation';
import { FAQController } from './faq.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/create-faq',
  auth(USER_ROLE.ADMIN),
  validateRequest(FAQValidation.createFAQZodSchema),
  FAQController.createFAQ
);
router.get('/', FAQController.getAllFAQs);

router.get('/:id', FAQController.getSingleFAQ);

router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN),
  validateRequest(FAQValidation.updateFAQZodSchema),
  FAQController.updateFAQ
);

router.delete('/:id', auth(USER_ROLE.ADMIN), FAQController.deleteFAQ);

export const FAQRoutes = router;
