import express from "express";
import { SavedItemControllers } from "./savedItem.controllers";
import { UserRoles } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get(
  "/",
  auth(UserRoles.SUPERADMIN, UserRoles.SERVICE_PROVIDER, UserRoles.TENANT, UserRoles.PROPERTY_OWNER),
  SavedItemControllers.getSavedItems,
);

router.post(
  "/create",
  auth(UserRoles.SUPERADMIN, UserRoles.SERVICE_PROVIDER, UserRoles.TENANT, UserRoles.PROPERTY_OWNER),
  SavedItemControllers.createSavedItem,
);

router.delete(
  "/remove",
  auth(UserRoles.SUPERADMIN, UserRoles.SERVICE_PROVIDER, UserRoles.TENANT, UserRoles.PROPERTY_OWNER),
  SavedItemControllers.removeSavedItem,
);

export const SavedItemRouter = router;
