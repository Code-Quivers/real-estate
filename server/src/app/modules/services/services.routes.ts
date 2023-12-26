import express from "express";
import { ServicesController } from "./services.controller";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { ServicesValidation } from "./services.validation";

const router = express.Router();

// ! create or update service details
router.put("/create-or-update-service", auth(UserRoles.SERVICE_PROVIDER), validateRequest(ServicesValidation.createOrUpdateService), ServicesController.createOrUpdateService);

export const ServicesRoutes = router;
