import express from "express"
import { SavedItemConrtollers } from "./savedItem.controllers";
import { UserRoles } from "@prisma/client";
import auth from "../../middlewares/auth";


const router = express.Router();

router.get("/", SavedItemConrtollers.getSavedItems)
router.post("/create",
    auth(UserRoles.SUPERADMIN, UserRoles.SERVICE_PROVIDER, UserRoles.SERVICE_PROVIDER, UserRoles.PROPERTY_OWNER),
    SavedItemConrtollers.createSavedItem
)

export const SavedItemRouter = router;