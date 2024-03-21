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

export const MaintenanceRequestRouter = router;
