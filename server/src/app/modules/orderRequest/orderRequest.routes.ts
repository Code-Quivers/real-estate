import express from "express";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import { OrderRequestControllers } from "./orderRequest.controller";

const router = express.Router();

// ! get all available  tenants
router.get("/", auth(UserRoles.SERVICE_PROVIDER), OrderRequestControllers.getMyRequestedOrder);

export const PendingOrderRoutes = router;
