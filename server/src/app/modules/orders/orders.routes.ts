import express from "express";
import { OrdersController } from "./orders.controllers";
import { UserRoles } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get(
  "/get-single-order/:orderId",
  auth(UserRoles.SUPERADMIN, UserRoles.SERVICE_PROVIDER, UserRoles.TENANT, UserRoles.PROPERTY_OWNER),
  OrdersController.getSavedItems,
);

export const OrderRoutes = router;
