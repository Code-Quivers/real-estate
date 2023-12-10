import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { LdCpAopStatusController } from './LdCpAopStatus.controller';
import { LdCpAopStatusValidation } from './LdCpAopStatus.validations';

const router = express.Router();

// ! Create New  LdCpAopStatus  Status ------------------------------->>>
router.post(
  '/create',
  validateRequest(LdCpAopStatusValidation.createLdCpAopStatus),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  LdCpAopStatusController.createNewLdCpAopStatus
);

export const LdCpAopStatusRoutes = router;
