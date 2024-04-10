import express, { NextFunction, Request, Response } from "express";

import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import StripeController from "./stripe.controllers";
// import { PaypalController } from "./paypal.controllers";

const router = express.Router();

// Stripe payment request route
router.post(
  "/create-payment-intent",
//   auth(UserRoles.TENANT, UserRoles.PROPERTY_OWNER),
  StripeController.createPaymentIntent,
);

export const StripeRoutes = router;
