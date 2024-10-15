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
import { sendEmailToMessageReceiver } from "../../../shared/emailNotification/emailForMessaging";

// ! start new conversation
const startNewConversation = async (userId: string, receiverId: string, payload: any): Promise<Conversation> => {
  return await prisma.$transaction(async (transactionClient) => {
    //  check is exist receiver

    const isExistReceiver = await transactionClient.user.findUnique({
      where: {
        userId: receiverId,
      },
      select: {
        email: true,
        userId: true,
      },
    });
    if (!isExistReceiver) {
      throw new ApiError(httpStatus.NOT_FOUND, "Receiver Not Found");
    }

    // Check if a conversation already exists between the users
    const existingConversation = await transactionClient.conversation.findFirst({
      where: {
        AND: [{ perticipants: { some: { userId: userId } } }, { perticipants: { some: { userId: receiverId } } }],
      },
    });

    // If conversation exists, send message only
    if (existingConversation) {
      await transactionClient.message.create({
        data: {
          text: payload.text,
          senderId: userId,
          conversationId: existingConversation.conversationId,
        },
      });

      // Update the last message in the conversation
      await transactionClient.conversation.update({
        where: { conversationId: existingConversation.conversationId },
        data: { lastMessage: payload.text },
      });
      // ! send email notification to message receiver
      await sendEmailToMessageReceiver(isExistReceiver);
      return existingConversation;
    } else {
      // Create a new conversation with the specified sender and receiver
      const newConversation = await transactionClient.conversation.create({
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
      // ! send email notification to message receiver
      await sendEmailToMessageReceiver(isExistReceiver);
      return newConversation;
    }

    //
  });
};

// ! send new message
const sendMessage = async (userId: string, conversationId: string, req: Request) => {
  // Extract new images paths
  const imagesPath: string[] = ((req?.files as IUploadFile[]) || []).map(
    (item: IUploadFile) => `conversations/${item?.filename}`,
  );

  const { text } = req?.body as ISendMessage;

  // Start Prisma transaction
  return prisma.$transaction(async (transactionClient) => {
    // Check if the conversation exists and the user is a participant

    const existingConversation = await transactionClient.conversation.findFirst({
      where: {
        AND: [{ conversationId }, { perticipants: { some: { userId } } }],
      },
    });

    if (!existingConversation) {
      throw new Error("Conversation not found");
    }

    // Create message data
    const messageData = {
      text,
      images: imagesPath,
      conversationId,
      senderId: userId,
    };

    // Create the message
    const newMessage = await transactionClient.message.create({
      data: messageData,
      include: {
        conversation: {
          select: {
            perticipants: {
              select: {
                userId: true,
              },
            },
          },
        },
      },
    });

    if (!newMessage) {
      throw new Error("Failed to send message");
    }

    // Update the last message in the conversation
    await transactionClient.conversation.update({
      where: { conversationId },
      data: { lastMessage: messageData?.text },
    });

    return newMessage;
  });
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
            userId: {
              not: userId, // This ensures the conversation has at least one participant that is NOT the current user
            },
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
              updatedAt: "desc",
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

// ! get single chats messages
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const getSingleChat = async (
  conversationId: string,
  userId: string,
  options: IPaginationOptions,
): Promise<IGenericResponse<Conversation>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.$transaction(async (transactionClient) => {
    //

    const chatMessages = await transactionClient.conversation.findUnique({
      where: {
        conversationId,
      },

      include: {
        _count: true,
        messages: {
          include: {
            sender: {
              select: {
                userId: true,
                role: true,
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
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: limit, // Limit the number of messages
          skip, // Calculate skip based on page number
        },
        perticipants: {
          where: {
            userId: {
              not: userId,
            },
          },
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
        },
      },
    });

    if (!chatMessages) {
      throw new ApiError(httpStatus.NOT_FOUND, "Conversation not found !");
    }

    const total = chatMessages?._count?.messages ?? 0;
    const totalPage = Math.ceil(total / limit);

    return { meta: { page, limit, total, totalPage }, data: chatMessages };
  });
  return result;
};

export const ConversationService = { startNewConversation, sendMessage, getMyAllConversation, getSingleChat };
