import express from "express";
import { TenantControllers } from "./tenant.controllers";

const router = express.Router();


router.get('/all', TenantControllers.getTenants);

export const TenantRouters = router;