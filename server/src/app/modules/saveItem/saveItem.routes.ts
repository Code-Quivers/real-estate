import express from "express"
import { SavedItemConrtollers } from "./saveItem.controllers";


const router = express.Router();

router.get("", SavedItemConrtollers.getSavedItems)
// router.get("/create", SavedItemConrtollers.getSavedItems)

export const SavedItemRouter = router;