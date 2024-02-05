import express from "express";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post("/user/create", AuthController.createUser);

router.post(
  "/tenant/create-user",

  // validateRequest(UserValidation.createUser),
  AuthController.createNewUserForTenant,
);

router.post(
  "/property-owner/create-user",

  // validateRequest(UserValidation.createUser),
  AuthController.createNewUserForPropertyOwner,
);

router.post(
  "/service-provider/create-user",

  // validateRequest(UserValidation.createUser),
  AuthController.createNewUserForServiceProvider,
);

router.post("/login", AuthController.userLogin);

router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes = router;
