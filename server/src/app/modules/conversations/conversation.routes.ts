import express, { NextFunction, Request, Response } from "express";
import { ConversationController } from "./conversation.controller";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import { ConversationFileUploadHelper } from "../../../helpers/ConversationFileUploadHelper";
import { ConversationsValidation } from "./conversation.validation";
import validateRequest from "../../middlewares/validateRequest";
const router = express.Router();

// ! start conversation
router.post(
  "/start-conversation/:receiverId",
  auth(UserRoles.PROPERTY_OWNER, UserRoles.TENANT, UserRoles.SERVICE_PROVIDER),
  validateRequest(ConversationsValidation.startConversation),
  ConversationController.startNewConversation,
);

// ! send message
router.post(
  "/send-message",
  auth(UserRoles.PROPERTY_OWNER, UserRoles.TENANT, UserRoles.SERVICE_PROVIDER),
  ConversationFileUploadHelper.uploadPropertyImages.array("files"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ConversationsValidation.sendMessage.parse(JSON.parse(req.body.data));
    return ConversationController.sendMessage(req, res, next);
  },
);

// ! get my all conversations
router.get(
  "/get-my-all-conversations",
  auth(UserRoles.PROPERTY_OWNER, UserRoles.SUPERADMIN),
  ConversationController.getMyAllConversation,
);
router.get(
  "/get-message/:conversationId",
  auth(UserRoles.PROPERTY_OWNER, UserRoles.TENANT, UserRoles.SERVICE_PROVIDER),
  ConversationController.getSingleChat,
);

export const ConversationRoutes = router;
