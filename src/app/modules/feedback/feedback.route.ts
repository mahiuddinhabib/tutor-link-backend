import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FeedbackValidation } from './feedback.validation';
import { FeedbackController } from './feedback.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/create-feedback',
  auth(USER_ROLE.CUSTOMER),
  validateRequest(FeedbackValidation.createFeedbackZodSchema),
  FeedbackController.createFeedback
);
router.get('/', FeedbackController.getAllFeedbacks);

router.get('/:id', FeedbackController.getSingleFeedback);

router.patch(
  '/:id',
  auth(USER_ROLE.CUSTOMER),
  validateRequest(FeedbackValidation.updateFeedbackZodSchema),
  FeedbackController.updateFeedback
);

router.delete('/:id', auth(USER_ROLE.CUSTOMER), FeedbackController.deleteFeedback);

export const FeedbackRoutes = router;
