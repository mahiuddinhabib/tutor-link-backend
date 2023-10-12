import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SubjectValidation } from './subject.validation';
import { SubjectController } from './subject.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/create-subject',
  auth(USER_ROLE.ADMIN),
  validateRequest(SubjectValidation.createSubjectZodSchema),
  SubjectController.createSubject
);
router.get('/', SubjectController.getAllSubjects);

router.get('/:id', SubjectController.getSingleSubject);

router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN),
  validateRequest(SubjectValidation.updateSubjectZodSchema),
  SubjectController.updateSubject
);

router.delete('/:id', auth(USER_ROLE.ADMIN), SubjectController.deleteSubject);

export const SubjectRoutes = router;
