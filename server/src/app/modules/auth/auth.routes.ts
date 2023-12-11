import express from 'express';
import { AuthController } from './auth.controller';
import { UserRoles } from '@prisma/client';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/tenant/create-user',
  // auth(UserRoles.SUPERADMIN, UserRoles.TENANT),
  // validateRequest(UserValidation.createUser),
  AuthController.createNewUserForTenant
);

router.post(
  '/property-owner/create-user',
  auth(UserRoles.SUPERADMIN, UserRoles.PROPERTY_OWNER),
  // validateRequest(UserValidation.createUser),
  AuthController.createNewUserForPropertyOwner
);

router.post(
  '/service-provider/create-user',
  auth(UserRoles.SUPERADMIN, UserRoles.SERVICE_PROVIDER),
  // validateRequest(UserValidation.createUser),
  AuthController.createNewUserForServiceProvider
);

router.post('/login', AuthController.userLogin);

router.post('/refresh-token', AuthController.refreshToken);

export const AuthRoutes = router;
