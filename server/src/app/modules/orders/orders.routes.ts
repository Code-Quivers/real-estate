import express from "express";
import { OrdersController } from "./orders.controllers";
import { UserRoles } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get(
  "/get-single-order/:orderId",
  auth(UserRoles.SUPERADMIN, UserRoles.TENANT, UserRoles.PROPERTY_OWNER),
  OrdersController.getSingleOrder,
);
router.patch(
  "/update-to-trial-period/:orderId",
  auth(UserRoles.PROPERTY_OWNER),
  OrdersController.updatePropertyTrialPeriod,
);

export const OrderRoutes = router;
