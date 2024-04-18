/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { Conversation, Prisma } from "@prisma/client";
import { IChatFilterRequest, ISendMessage } from "./conversation.interfaces";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { chatRelationalFields, chatRelationalFieldsMapper, chatSearchableFields } from "./conversation.constants";
import { IGenericResponse } from "../../../interfaces/common";
import { IUploadFile } from "../../../interfaces/file";
import { Request } from "express";

// ! start new conversation
const startNewConversation = async (userId: string, receiverId: string, payload: any): Promise<Conversation> => {
  // Check if a conversation already exists between the users
  const existingConversation = await prisma.conversation.findFirst({
    where: {
      AND: [{ perticipants: { some: { userId: userId } } }, { perticipants: { some: { userId: receiverId } } }],
    },
  });
  console.log(payload);

  // If conversation exists, send message only
  if (existingConversation) {
    await prisma.message.create({
      data: {
        text: payload.text,
        senderId: userId,
        conversationId: existingConversation.conversationId,
      },
    });

    // Update the last message in the conversation
    await prisma.conversation.update({
      where: { conversationId: existingConversation.conversationId },
      data: { lastMessage: payload.text },
    });

    return existingConversation;
  }

  console.log(payload);

  // Create a new conversation with the specified sender and receiver
  const newConversation = await prisma.conversation.create({
    data: {
      perticipants: {
        connect: [{ userId: userId }, { userId: receiverId }],
      },
      lastMessage: payload.text,
      messages: {
        create: {
          text: payload.text,
          senderId: userId,
        },
      },
    },
  });

  if (!newConversation) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to start conversation");
  }

  return newConversation;
};

// ! send new message
const sendMessage = async (userId: string, conversationId: string, req: Request) => {
  // Extract new images paths
  const imagesPath: string[] = ((req.files as IUploadFile[]) || []).map(
    (item: IUploadFile) => `conversations/${item?.filename}`,
  );

  const { text } = req?.body as ISendMessage;

  // Check if the conversation exists and the user is a participant
  const existingConversation = await prisma.conversation.findFirst({
    where: {
      AND: [{ conversationId }, { perticipants: { some: { userId } } }],
    },
  });

  if (!existingConversation) {
    throw new ApiError(httpStatus.NOT_FOUND, "Conversation not found");
  }

  // Create message data
  const messageData = {
    text,
    images: imagesPath,
    conversationId,
    senderId: userId,
  };

  // Create the message
  const newMessage = await prisma.message.create({
    data: messageData,
  });

  if (!newMessage) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to send message");
  }

  return newMessage;
};

// ! getMyAllConversation
const getMyAllConversation = async (
  filters: IChatFilterRequest,
  options: IPaginationOptions,
  userId: string,
): Promise<IGenericResponse<Conversation[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: chatSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (chatRelationalFields.includes(key)) {
          return {
            [chatRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.ConversationWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  //
  const result = await prisma.$transaction(async (transactionClient) => {
    const allChats = await transactionClient.conversation.findMany({
      where: {
        ...whereConditions,
        perticipants: {
          some: {
            OR: [
              {
                userId,
              },
            ],
          },
        },
      },
      skip,
      include: {
        perticipants: {
          select: {
            tenant: {
              select: {
                firstName: true,
                lastName: true,
                profileImage: true,
              },
            },
            serviceProvider: {
              select: {
                firstName: true,
                lastName: true,
                profileImage: true,
              },
            },
            propertyOwner: {
              select: {
                firstName: true,
                lastName: true,
                profileImage: true,
              },
            },
            role: true,
          },
          where: {
            userId: {
              not: userId,
            },
          },
        },
      },
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
              createdAt: "desc",
            },
    });

    const total = await prisma.conversation.count({
      where: whereConditions,
    });
    const totalPage = Math.ceil(total / limit);
    return {
      meta: {
        page,
        limit,
        total,
        totalPage,
      },
      data: allChats,
    };
  });

  return result;
};

// ! createOrUpdateService
const getSingleChat = async (conversationId: string): Promise<Conversation> => {
  // !
  const result = await prisma.$transaction(async (transactionClient) => {
    //
    const chatMessages = await transactionClient.conversation.findUnique({
      where: {
        conversationId,
      },

      include: {
        _count: true,
        messages: {
          orderBy: {
            createdAt: "desc",
          },
        },

        perticipants: true,
      },
    });
    if (!chatMessages) {
      throw new ApiError(httpStatus.NOT_FOUND, "Conversation not found !");
    }
    return chatMessages;
  });
  return result;
};

export const ConversationService = { startNewConversation, sendMessage, getMyAllConversation, getSingleChat };
