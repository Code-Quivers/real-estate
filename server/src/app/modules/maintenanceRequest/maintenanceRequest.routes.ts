import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import { MaintenanceRequestFileUploadHelper } from "../../../helpers/MaintenanceRequestFileUploadHelper";
import { MaintenanceRequestValidation } from "./maintenanceRequest.validation";
import { MaintenanceRequestControllers } from "./maintenanceRequest.controllers";

const router = express.Router();
// ----------------------------

router.post(
  "/add-request-to-property-owner",
  auth(UserRoles.TENANT),
  MaintenanceRequestFileUploadHelper.uploadMaintenanceRequestImages.array("files"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = MaintenanceRequestValidation.addMaintenanceRequest.parse(JSON.parse(req.body.data));
    return MaintenanceRequestControllers.addRequestMaintenanceToPropertyOwner(req, res, next);
  },
);

// ! get my requested maintenance for tenant user
router.get(
  "/my-requested-maintenance",
  auth(UserRoles.TENANT),
  MaintenanceRequestControllers.getMyRequestedMaintenance,
);
// ! get all requested maintenance for property owner
router.get(
  "/requested-maintenance-for-owner",
  auth(UserRoles.PROPERTY_OWNER),
  MaintenanceRequestControllers.getRequestedMaintenanceForPropertyOwner,
);
// ! get all requested maintenance for property owner
router.get(
  "/requested-maintenance-for-service-providers",
  auth(UserRoles.SERVICE_PROVIDER),
  MaintenanceRequestControllers.getRequestedMaintenanceForServiceProvider,
);
// ! accept request and send to service providers
router.patch(
  "/accept-maintenance-req-for-owner/:maintenanceRequestId",
  auth(UserRoles.PROPERTY_OWNER),
  MaintenanceRequestControllers.acceptRequestMaintenanceForOwner,
);

export const MaintenanceRequestRouter = router;
