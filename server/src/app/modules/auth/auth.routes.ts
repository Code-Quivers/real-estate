import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/create-user',
  // auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  // validateRequest(UserValidation.createUser),
  AuthController.createNewUser
);

router.post('/login', AuthController.userLogin);

router.post('/refresh-token', AuthController.refreshToken);

export const AuthRoutes = router;
