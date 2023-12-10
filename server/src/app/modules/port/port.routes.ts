import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PortController } from './port.controller';
import { PortValidation } from './port.validations';

const router = express.Router();

// ! Create New  Port ------------------------------->>>
router.post(
  '/',
  validateRequest(PortValidation.createPort),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  PortController.createNewPort
);
// ! Get all Port----------------------------------->>>
router.get(
  '/',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  PortController.getAllPorts
);
// ! Get all Port Names----------------------------------->>>
router.get(
  '/get-all-port-names',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  PortController.getAllPortNames
);

// ! Get Single Port----------------------------------->>>
router.get(
  '/single/:portId',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  PortController.getSinglePort
);
// ! Update Port----------------------------------->>>
router.patch(
  '/update/:portId',
  validateRequest(PortValidation.updatePort),
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  PortController.updatePortInformation
);

export const PortRoutes = router;
