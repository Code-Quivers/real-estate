import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import { TenantsControllers } from "./tenants.controller";
import { FileUploadHelper } from "../../../helpers/FileUploadHelper";
import { TenantsValidation } from "./tenants.validation";

const router = express.Router();
// ! get all tenants
router.get(
  "/get-all-tenants",
  auth(UserRoles.PROPERTY_OWNER, UserRoles.SERVICE_PROVIDER, UserRoles.SUPERADMIN),
  TenantsControllers.getAllTenants,
);
// ! get all available  tenants
router.get(
  "/get-all-available-tenants",
  auth(UserRoles.PROPERTY_OWNER, UserRoles.SERVICE_PROVIDER, UserRoles.SUPERADMIN),
  TenantsControllers.getAllAvailableTenants,
);
// ! get single tenant
router.get(
  "/get-single-tenant/:tenantId",
  auth(UserRoles.PROPERTY_OWNER, UserRoles.SERVICE_PROVIDER, UserRoles.SUPERADMIN),
  TenantsControllers.getSingleTenant,
);
// ! get tenant my profile
router.get("/get-my-profile", auth(UserRoles.TENANT), TenantsControllers.getTenantMyProfile);
// ! update tenant profile
router.patch(
  "/update-profile/:tenantId",
  auth(UserRoles.TENANT, UserRoles.SUPERADMIN, UserRoles.PROPERTY_OWNER),
  FileUploadHelper.uploadUpdatedUserImage.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = TenantsValidation.updateTenantProfile.parse(JSON.parse(req.body.data));
    return TenantsControllers.updateTenantProfile(req, res, next);
  },
);

// ! get tenant my unit information
router.get("/get-my-unit-information", auth(UserRoles.TENANT), TenantsControllers.getMyUnitInformation);

export const TenantsRouters = router;
