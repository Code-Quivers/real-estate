import express from "express";
import { ServicesController } from "./conversation.controller";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
const router = express.Router();

// ! get all tenants
router.get(
  "/get-all-services",
  auth(UserRoles.PROPERTY_OWNER, UserRoles.SUPERADMIN),
  ServicesController.getAllServices,
);
router.get(
  "/get-single-service/:serviceId",
  auth(UserRoles.PROPERTY_OWNER, UserRoles.SUPERADMIN),
  ServicesController.getSingleService,
);

export const ServicesRoutes = router;
