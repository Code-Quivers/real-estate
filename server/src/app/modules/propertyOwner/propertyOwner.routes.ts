import express, { NextFunction, Request, Response } from "express";
import { PropertyOwnerControllers } from "./propertyOwnerControllers";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import { FileUploadHelper } from "../../../helpers/FileUploadHelper";
import { PropertyOwnerValidation } from "./PropertyOwner.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();
// ! get all property owners
router.get(
  "/get-all-property-owners",
  //  auth(UserRoles.SUPERADMIN),
  PropertyOwnerControllers.getAllPropertyOwners,
);

// ! get single property owner
router.get(
  "/get-single-property-owner/:propertyOwnerId",
  auth(UserRoles.SUPERADMIN, UserRoles.SERVICE_PROVIDER, UserRoles.PROPERTY_OWNER),
  PropertyOwnerControllers.getSinglePropertyOwner,
);
// ! get property owner  my profile
router.get("/get-my-profile", auth(UserRoles.PROPERTY_OWNER), PropertyOwnerControllers.getPropertyOwnerMyProfile);

// ! update property owner
router.patch(
  "/update-profile/:propertyOwnerId",
  // auth(UserRoles.PROPERTY_OWNER, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadUpdatedUserImage.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = PropertyOwnerValidation.updatePropertyOwner.parse(JSON.parse(req.body.data));
    return PropertyOwnerControllers.UpdatePropertyOwner(req, res, next);
  },
);

router.get("/financial-info", auth(UserRoles.PROPERTY_OWNER), PropertyOwnerControllers.getFinancialAccount);

router.get("/dashboard-info", auth(UserRoles.PROPERTY_OWNER), PropertyOwnerControllers.getDashboardInfo);
// update cost
router.patch(
  "/update-extra-cost",
  auth(UserRoles.PROPERTY_OWNER),
  validateRequest(PropertyOwnerValidation.updateExtraCost),
  PropertyOwnerControllers.updateExtraCost,
);

// ! get my tenants
router.get("/get-my-tenants", auth(UserRoles.PROPERTY_OWNER), PropertyOwnerControllers.getMyAssignedTenants);

export const PropertyOwnerRouter = router;
