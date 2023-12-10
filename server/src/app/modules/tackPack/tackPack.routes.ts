import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { TackPackController } from './tackPack.controller';
import { TackPackValidation } from './tackPack.validations';

const router = express.Router();

// ! Create New  PPSubmission ------------------------------->>>
router.post(
  '/create-tack-pack',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(TackPackValidation.createTackPack),
  TackPackController.createTackPack
);

export const TackPackRoutes = router;
