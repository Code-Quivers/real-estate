import express from "express";

import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import PayerTenantController from "./payerTenant/payer.tenant.controller";
import StripeController from "./payerPropertyOwner/payer.propertyOwner.controllers";

const router = express.Router();

// Stripe payment request route
router.post(
  "/create-payment-intent",
  auth(UserRoles.TENANT, UserRoles.PROPERTY_OWNER),
  StripeController.createPaymentIntent,
);

// Stripe payment request route
router.post("/create-tenant-payment-intent", auth(UserRoles.TENANT), PayerTenantController.createTenantPaymentIntent);

router.post(
  "/retrive-payment-info",
  auth(UserRoles.TENANT, UserRoles.PROPERTY_OWNER),
  StripeController.retriveStripePaymentInformation,
);

router.post(
  "/retrive-tenant-payment-info",
  auth(UserRoles.TENANT),
  PayerTenantController.retriveTenantPaymentInformation,
);

router.post(
  "/create-connected-account",
  auth(UserRoles.TENANT, UserRoles.PROPERTY_OWNER),
  StripeController.createConnectedAccount,
);

router.post(
  "/create-account-link",
  auth(UserRoles.TENANT, UserRoles.PROPERTY_OWNER),
  StripeController.createAccountLink,
);

export const StripeRoutes = router;
