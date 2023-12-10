import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validations';
import { UserController } from './users.controller';

const router = express.Router();

// !  get all Users ------------------------------>>>
router.get(
  '/',
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  UserController.getAllUsersController
);

// !  get My Profile ------------------------------>>>
router.get(
  '/my-profile',
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  UserController.getMyProfile
);
// !  Update  User data ------------------------------>>>
router.patch(
  '/update-user/:userId',
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(UserValidation.updateUser),
  UserController.updateUserInfo
);
// !  Update  Profile data ------------------------------>>>
router.patch(
  '/update-profile/:profileId',
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(UserValidation.updateUser),
  UserController.updateProfileInfo
);
// !  get single user ------------------------------>>>
router.get(
  '/:userId',
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  UserController.getSingleUser
);

export const UserRoutes = router;
