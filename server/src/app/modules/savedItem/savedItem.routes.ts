import express from "express";
import { SavedItemConrtollers } from "./savedItem.controllers";
import { UserRoles } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/", auth(UserRoles.SUPERADMIN, UserRoles.SERVICE_PROVIDER, UserRoles.SERVICE_PROVIDER, UserRoles.PROPERTY_OWNER), SavedItemConrtollers.getAllSavedItems);

router.post("/create", auth(UserRoles.SUPERADMIN, UserRoles.SERVICE_PROVIDER, UserRoles.PROPERTY_OWNER), SavedItemConrtollers.createSavedItem);

<<<<<<< HEAD
<<<<<<< HEAD
export const SavedItemRouter = router;
=======
=======
>>>>>>> 26643d1011163c529f23529b7af5a8de461a8739
router.delete("/remove",
    auth(UserRoles.SUPERADMIN, UserRoles.SERVICE_PROVIDER, UserRoles.SERVICE_PROVIDER, UserRoles.PROPERTY_OWNER),
    SavedItemConrtollers.removeSavedItem
)

export const SavedItemRouter = router;
<<<<<<< HEAD
>>>>>>> 5544faa6ca0b6e4d1dbac7797bda9889bb9a69ae
=======

>>>>>>> 26643d1011163c529f23529b7af5a8de461a8739
