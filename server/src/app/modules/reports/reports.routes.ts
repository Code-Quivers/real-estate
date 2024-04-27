import express from "express";
import { ReportsController } from "./reports.controller";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import { ReportsValidation } from "./reports.validation";
import validateRequest from "../../middlewares/validateRequest";
const router = express.Router();

// ! start conversation
router.post(
  "/add-monthly-or-annual-report",
  auth(UserRoles.PROPERTY_OWNER),
  validateRequest(ReportsValidation.addMonthlyOrAnnualReport),
  ReportsController.addMonthlyOrAnnualReport,
);

// ! get property owner reports
router.get("/property-owner-reports", auth(UserRoles.PROPERTY_OWNER), ReportsController.getPropertyOwnerReports);
//
router.get(
  "/get-message/:conversationId",
  auth(UserRoles.PROPERTY_OWNER, UserRoles.TENANT, UserRoles.SERVICE_PROVIDER),
  ReportsController.getSingleChat,
);

export const ReportsRoutes = router;
