/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { Conversation, Prisma, Report } from "@prisma/client";
import { IAddMonthlyOrAnnualReport, IChatFilterRequest, IInformationType, ISendMessage } from "./reports.interfaces";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { chatRelationalFields, chatRelationalFieldsMapper, chatSearchableFields } from "./reports.constants";
import { IGenericResponse } from "../../../interfaces/common";
import { IUploadFile } from "../../../interfaces/file";
import { Request } from "express";
import { reportTypePrefix } from "./reports.utils";

// ! add report
const addMonthlyOrAnnualReport = async (
  propertyOwnerId: string,
  payload: IAddMonthlyOrAnnualReport,
): Promise<Partial<Report>> => {
  const { propertyId } = payload;
  const res = await prisma.$transaction(async (transactionClient) => {
    const isExistProperty = await transactionClient.property.findUnique({
      where: {
        propertyId,
      },
      include: {
        Tenant: true,
      },
    });

    if (!isExistProperty) {
      throw new ApiError(httpStatus.NOT_FOUND, "Unit not Found !!");
    }
    // making information
    const information: IInformationType[] = [
      {
        image: isExistProperty.images[0],
        monthlyRent: isExistProperty?.monthlyRent,
        numOfBed: isExistProperty.numOfBed,
        numOfBath: isExistProperty.numOfBath,
        address: isExistProperty.address,
        tenantName: `${isExistProperty.Tenant?.firstName} ${isExistProperty.Tenant?.lastName}`,
        tenantPhoto: isExistProperty.Tenant?.profileImage,
      },
    ];
    //  rent collected - expenses
    const creatingData = {
      reportTitle: `${reportTypePrefix(payload.reportType)} Property Statement - Property ${isExistProperty.title}`,
      rentAmount: isExistProperty.monthlyRent,
      information,
      collectedRent: payload.collectedRent,
      expenses: payload.expenses,
      reportType: payload.reportType,
      grossProfit: payload.collectedRent - payload.expenses,
      propertyOwnerId,
    };

    const result = await transactionClient.report.create({
      data: creatingData,
    });
    return result;
    //
  });
  return res;
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

// ! createOrUpdateService
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const getSingleChat = async (conversationId: string, userId: string): Promise<Conversation> => {
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
    return chatMessages;
  });
  return result;
};

export const ReportsService = { addMonthlyOrAnnualReport, sendMessage, getMyAllConversation, getSingleChat };
