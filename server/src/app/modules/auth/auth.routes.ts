import express from "express";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post("/tenant/create-user", AuthController.createNewUserForTenant);

router.post("/property-owner/create-user", AuthController.createNewUserForPropertyOwner);

router.post("/service-provider/create-user", AuthController.createNewUserForServiceProvider);

router.post("/login", AuthController.userLogin);
// ! dashboard login for superadmin
router.post("/dashboard-login", AuthController.dashboardLogin);

router.post("/refresh-token", AuthController.refreshToken);
// forget password , generate reset link
router.post("/forget-password", AuthController.forgetPassword);
//
router.post("/reset-password/:resetToken", AuthController.resetPassword);
// for dashboard
router.post("/create-superadmin", AuthController.createSuperAdminUser);

export const AuthRoutes = router;
