import express from "express";
import { UserRoles } from "@prisma/client";
import auth from "../../middlewares/auth";
import { DashboardDataControllers } from "./dashboard.controllers";

const router = express.Router();

router.get("/get-dashboard-data", auth(UserRoles.SUPERADMIN), DashboardDataControllers.getDashboardData);

export const DashboardDataRoutes = router;
