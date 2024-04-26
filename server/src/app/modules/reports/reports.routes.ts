import express, { NextFunction, Request, Response } from "express";
import { ReportsController } from "./reports.controller";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import { ConversationFileUploadHelper } from "../../../helpers/ConversationFileUploadHelper";
import { ReportsValidation } from "./reports.validation";
import validateRequest from "../../middlewares/validateRequest";
const router = express.Router();

// ! start conversation
router.post(
  "/add-monthly-or-annual-report",
  auth(UserRoles.PROPERTY_OWNER),
  validateRequest(ReportsValidation.addMonthlyOrAnnualReport),
  ReportsController.addMonthlyOrAnnualReport,
);

// ! send message
router.post(
  "/send-message/:conversationId",
  auth(UserRoles.PROPERTY_OWNER, UserRoles.TENANT, UserRoles.SERVICE_PROVIDER),
  ConversationFileUploadHelper.uploadPropertyImages.array("files"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ReportsValidation.sendMessage.parse(JSON.parse(req.body.data));
    return ReportsController.sendMessage(req, res, next);
  },
);

// ! get my all conversations
router.get(
  "/get-my-all-conversations",
  auth(UserRoles.PROPERTY_OWNER, UserRoles.TENANT, UserRoles.SERVICE_PROVIDER),
  ReportsController.getMyAllConversation,
);
router.get(
  "/get-message/:conversationId",
  auth(UserRoles.PROPERTY_OWNER, UserRoles.TENANT, UserRoles.SERVICE_PROVIDER),
  ReportsController.getSingleChat,
);

export const ReportsRoutes = router;
