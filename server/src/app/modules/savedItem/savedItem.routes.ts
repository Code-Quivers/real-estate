import express from "express";
import { SavedItemConrtollers } from "./savedItem.controllers";
import { UserRoles } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/", auth(UserRoles.SUPERADMIN, UserRoles.SERVICE_PROVIDER, UserRoles.SERVICE_PROVIDER, UserRoles.PROPERTY_OWNER), SavedItemConrtollers.getAllSavedItems);

router.post("/create", auth(UserRoles.SUPERADMIN, UserRoles.SERVICE_PROVIDER, UserRoles.PROPERTY_OWNER), SavedItemConrtollers.createSavedItem);

router.delete("/remove",
    auth(UserRoles.SUPERADMIN, UserRoles.SERVICE_PROVIDER, UserRoles.SERVICE_PROVIDER, UserRoles.PROPERTY_OWNER),
    SavedItemConrtollers.removeSavedItem
)

export const SavedItemRouter = router;

