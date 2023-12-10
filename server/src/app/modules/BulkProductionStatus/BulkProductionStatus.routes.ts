import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BulkProductionStatusController } from './BulkProductionStatus.controller';
import { BulkProductionStatusValidation } from './BulkProductionStatus.validations';

const router = express.Router();

// ! Create New  Order ------------------------------->>>
router.post(
  '/',
  validateRequest(BulkProductionStatusValidation.createBulkProductionStatus),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  BulkProductionStatusController.createNewBulkProductionStatus
);
// ! Get all Orders----------------------------------->>>
router.get(
  '/',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  BulkProductionStatusController.getAllBulkProductionStatus
);

// ! Get Single Order----------------------------------->>>
router.get(
  '/:bulkProductionId',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  BulkProductionStatusController.getSingleBulkProductionStatus
);
// ! Update Order----------------------------------->>>
router.patch(
  '/:bulkProductionId',
  validateRequest(BulkProductionStatusValidation.updateBulkProductionStatus),
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  BulkProductionStatusController.updateBulkProductionStatus
);

export const BulkProductionStatusRoutes = router;
