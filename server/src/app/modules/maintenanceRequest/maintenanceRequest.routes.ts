import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import { MaintenanceRequestFileUploadHelper } from "../../../helpers/MaintenanceRequestFileUploadHelper";
import { MaintenanceRequestValidation } from "./maintenanceRequest.validation";
import { MaintenanceRequestControllers } from "./maintenanceRequest.controllers";
import validateRequest from "../../middlewares/validateRequest";

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

// ! get my(tenant) requested maintenance for tenant user
router.get(
  "/my-requested-maintenance",
  auth(UserRoles.TENANT),
  MaintenanceRequestControllers.getMyRequestedMaintenance,
);
// ! get my(Service Provider) accepted orders (all Orders)

router.get(
  "/my-all-accepted-orders",
  auth(UserRoles.SERVICE_PROVIDER),
  MaintenanceRequestControllers.getMyAllOrdersForServiceProvider,
);
// -0-------------------------------------------------
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
// ! accept request and send start to work for service providers
router.patch(
  "/accept-maintenance-req-for-service-provider/:maintenanceRequestId",
  auth(UserRoles.SERVICE_PROVIDER),
  MaintenanceRequestControllers.acceptRequestMaintenanceForServiceProvider,
);

// ! Update Order request (status)
router.post(
  "/update-maintenance-order-req/:maintenanceRequestId",
  auth(UserRoles.SERVICE_PROVIDER),
  validateRequest(MaintenanceRequestValidation.UpdateMaintenanceRequest),
  MaintenanceRequestControllers.updateRequestMaintenanceForServiceProvider,
);

export const MaintenanceRequestRouter = router;
