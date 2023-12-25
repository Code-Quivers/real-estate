// import express, { NextFunction, Request, Response } from 'express';
// import { PropertyOwnerControllers } from './propertyOwnerControllers';
// import auth from '../../middlewares/auth';
// import { UserRoles } from '@prisma/client';
// import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
// import { PropertyOwnerValidation } from './PropertyOwner.validation';

// const router = express.Router();

// router.patch(
//   '/update-profile/:propertyOwnerId',
//   auth(UserRoles.PROPERTY_OWNER),
//   FileUploadHelper.uploadUpdatedUserImage.single('file'),

//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = PropertyOwnerValidation.updatePropertyOwner.parse(
//       JSON.parse(req.body.data)
//     );

//     return PropertyOwnerControllers.UpdatePropertyOwner(req, res, next);
//   }
// );

// export const PropertyOwnerRouter = router;

import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import { TenantsControllers } from "./tenants.controller";
import { FileUploadHelper } from "../../../helpers/FileUploadHelper";
import { TenantsValidation } from "./tenants.validation";

const router = express.Router();
// ! get all tenants
router.get("/get-all-tenants", auth(UserRoles.PROPERTY_OWNER, UserRoles.PROPERTY_OWNER, UserRoles.SERVICE_PROVIDER, UserRoles.SUPERADMIN), TenantsControllers.getAllTenants);
// ! get single tenant
router.get(
  "/get-single-tenant/:tenantId",
  auth(UserRoles.PROPERTY_OWNER, UserRoles.PROPERTY_OWNER, UserRoles.SERVICE_PROVIDER, UserRoles.SUPERADMIN),
  TenantsControllers.getSingleTenant,
);
// ! update tenant profile
router.patch(
  "/update-profile/:tenantId",
  auth(UserRoles.TENANT, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadUpdatedUserImage.single("file"),

  (req: Request, res: Response, next: NextFunction) => {
    req.body = TenantsValidation.updateTenantProfile.parse(JSON.parse(req.body.data));
    return TenantsControllers.updateTenantProfile(req, res, next);
  },
);

export const TenantsRouters = router;
