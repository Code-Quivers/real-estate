import express, { NextFunction, Request, Response } from "express";
import { ReportsController } from "./reports.controller";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import { ReportsValidation } from "./reports.validation";
import validateRequest from "../../middlewares/validateRequest";
import { TaxDocumentFileUploadHelper } from "../../../helpers/TaxDocumentFileUploadHelper";
const router = express.Router();

// ! add monthly / annual report
router.post(
  "/add-monthly-or-annual-report",
  auth(UserRoles.PROPERTY_OWNER),
  validateRequest(ReportsValidation.addMonthlyOrAnnualReport),
  ReportsController.addMonthlyOrAnnualReport,
);

//  ! add annual tax document

router.post(
  "/annual-tax-document-report",
  auth(UserRoles.PROPERTY_OWNER),
  TaxDocumentFileUploadHelper.uploadTaxDocumentPdf.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ReportsValidation.addAnnualTaxDocument.parse(JSON.parse(req.body.data));
    return ReportsController.addAnnualTaxDocument(req, res, next);
  },
);

// ! add Tenant information report
router.post("/generate-tenant-info-report", auth(UserRoles.PROPERTY_OWNER), ReportsController.generateTenantInfoReport);

// ! get property owner reports
router.get("/property-owner-reports", auth(UserRoles.PROPERTY_OWNER), ReportsController.getPropertyOwnerReports);
//
router.get("/report-details/:reportId", auth(UserRoles.PROPERTY_OWNER), ReportsController.getReportDetails);

export const ReportsRoutes = router;
