import express from "express";
import { PropertyOwnerControllers } from "./propertyOwnerControllers";


const router = express.Router();


router.post('/create-update',
    PropertyOwnerControllers.creatOrUpdatePropertyOwner
);

export const PropertyOwnerRouter = router;