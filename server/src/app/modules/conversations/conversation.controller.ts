import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ConversationService } from "./conversation.service";
import pick from "../../../shared/pick";
import { chatFilterableFields } from "./conversation.constants";
import { IRequestUser } from "../../interfaces/global.interfaces";

// ! start new conversation
const startNewConversation = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as IRequestUser).userId;
  const receiverId = req.params.receiverId;
  const result = await ConversationService.startNewConversation(userId, receiverId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message Sent Successfully",
    data: result,
  });
});

// ! Send message
const sendMessage = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as IRequestUser).userId;
  const conversationId = req?.params?.conversationId;
  const result = await ConversationService.sendMessage(userId, conversationId, req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message Sent Successfully",
    data: result,
  });
});

// ! get getMyAllConversation
const getMyAllConversation = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, chatFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const userId = (req.user as IRequestUser).userId;
  const result = await ConversationService.getMyAllConversation(filters, options, userId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Conversations Retrieved Successfully",
    data: result,
  });
});
// ! get single Chat
const getSingleChat = catchAsync(async (req: Request, res: Response) => {
  //
  const conversationId = req.params?.conversationId;
  const userId = (req.user as IRequestUser).userId;
  const options = pick(req.query, ["limit", "page"]);

  const result = await ConversationService.getSingleChat(conversationId, userId, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Conversations Retrieved Successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const ConversationController = { startNewConversation, sendMessage, getMyAllConversation, getSingleChat };
