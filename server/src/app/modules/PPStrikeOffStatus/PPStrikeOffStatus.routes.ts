import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PPStrikeOffStatusController } from './PPStrikeOffStatus.controller';
import { ppStrikeOffStatusValidation } from './PPStrikeOffStatus.validations';

const router = express.Router();

// ! Create New  Strike Off Status ------------------------------->>>
router.post(
  '/',
  validateRequest(ppStrikeOffStatusValidation.createPpStrikeOffStatus),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  PPStrikeOffStatusController.createNewPPStrikeOffStatus
);
// ! Get all Strike Off Status----------------------------------->>>
router.get(
  '/',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  PPStrikeOffStatusController.getAllPPStrikeOffStatus
);

// ! Get Single Strike Off Status----------------------------------->>>
router.get(
  '/:ppStatusId',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  PPStrikeOffStatusController.getSinglePPStrikeOffStatus
);
// ! Update Strike Off Status----------------------------------->>>
router.patch(
  '/:PPStatusId',
  validateRequest(ppStrikeOffStatusValidation.updatePpStrikeOffStatus),
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  PPStrikeOffStatusController.updatePPStrikeOffStatusInformation
);

export const PPStrikeOffStatusRoutes = router;
