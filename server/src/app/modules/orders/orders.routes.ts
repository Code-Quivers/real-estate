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
router.patch(
  "/update/:orderId",
  auth(UserRoles.SUPERADMIN, UserRoles.TENANT, UserRoles.PROPERTY_OWNER),
  OrdersController.updateOrderInfo,
),

router.patch(
  "/update-status",
  auth(UserRoles.SUPERADMIN, UserRoles.TENANT, UserRoles.PROPERTY_OWNER),
  OrdersController.updateOrderStatusAndPropertyPlanType,
)

export const OrderRoutes = router;
