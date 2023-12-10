import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PPSubmissionController } from './ppSubmission.controller';
import { PPSubmissionValidation } from './ppSubmission.validations';

const router = express.Router();

// ! Create New  PPSubmission ------------------------------->>>
router.post(
  '/submission-date',
  validateRequest(PPSubmissionValidation.createPPSubmission),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  PPSubmissionController.createNewPPSubmission
);

// ! Update PPSubmission----------------------------------->>>
router.patch(
  '/submit-date',
  validateRequest(PPSubmissionValidation.updatePPSubmission),
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  PPSubmissionController.updatePPSubmissionInformation
);

export const PPSubmissionRoutes = router;
