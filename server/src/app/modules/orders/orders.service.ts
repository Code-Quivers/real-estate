/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import { incrementMonth } from "../../../helpers/utils";

/**
 * Creates a new order in the database.
 */
const createOrder = async (orderInfo: any) => {
  // Map property IDs to connect property relationship
  const data = {
    ...orderInfo,
    properties: {
      connect: orderInfo.properties.map((propertyId: any) => ({ propertyId })),
    },
  };

  // Execute transaction to create the order
  const result = await prisma.$transaction(async (transactionClient) => {
    // Create a new order using transaction
    console.log("++++++++++++++++++++++++++++++");
    console.log(data);
    const newOrder = await transactionClient.order.create({
      data: data,
    });

    // If no new order is created, throw an error
    if (!newOrder) throw new ApiError(httpStatus.BAD_REQUEST, "No Order Found");

    // Return the newly created order
    return newOrder;
  });

  // Return the result of the transaction
  return result;
};

// ! get single order details
const getSingleOrder = async (orderId: string) => {
  if (!orderId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Order id is Required");
  }
  const result = await prisma.$transaction(async (transactionClient) => {
    const isExist = await transactionClient.order.findUnique({
      where: {
        orderId,
        orderStatus: "PENDING",
      },
      include: {
        owner: {
          select: { firstName: true, lastName: true, phoneNumber: true, userId: true, profileImage: true },
        },
        _count: true,
        properties: true,
        tenant: true,
      },
    });

    if (!isExist) throw new ApiError(httpStatus.BAD_REQUEST, "No Order Found");
    return isExist;
  });

  return result;
};

// ! property in trial period
const updatePropertyTrialPeriod = async (orderId: string) => {
  if (!orderId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Order id is Required");
  }

  // Retrieve order details
  const result = await prisma.$transaction(async (transactionClient) => {
    const isExistOrder = await transactionClient.order.findUnique({
      where: {
        orderId,
        orderStatus: "PENDING",
        properties: {
          every: {
            planType: {
              equals: "PENDING",
            },
          },
        },
      },
      include: {
        properties: {
          select: {
            propertyId: true,
          },
        },
      },
    });

    if (!isExistOrder) {
      throw new ApiError(httpStatus.BAD_REQUEST, "No Order Found");
    }

    //  updating properties
    const propertiesToUpdate = isExistOrder.properties?.map((property) => property.propertyId);

    const updateResult = await transactionClient.property.updateMany({
      where: {
        propertyId: {
          in: propertiesToUpdate,
        },
      },
      data: {
        planType: "ON_TRIAL",
      },
    });

    await transactionClient.order.update({
      where: {
        orderId,
      },
      data: {
        orderStatus: "CONFIRMED",
      },
    });

    if (updateResult.count > 0) {
      return updateResult;
    } else {
      // If no properties were updated, throwing an error
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to Activate trial period.");
    }
  });

  return result;
};

// Update a specific order info
const updateOrderInfo = async (orderId: string, orderInfo: any) => {
  const updatedInfo = await prisma.order.update({
    where: { orderId },
    data: orderInfo,
  });

  if (!updatedInfo) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to update the order information.");
  }

  return updatedInfo;
};

const updateOrderStatusAndPropertyPlanType = async (data: any) => {
  const { orderId, orderStatus, planType, isRentPayment } = data;
  const result = await prisma.$transaction(async (transactionClient) => {
    const updatedInfo = await transactionClient.order.update({
      where: {
        orderId,
      },
      data: {
        orderStatus: orderStatus,
        // properties: {
        //   updateMany: {
        //     where: { orderId: orderId },
        //     data: {
        //       planType: planType,
        //     }
        //   }
        // }
      },
    });

    // if the order is for paying rent then return the result
    if (isRentPayment) return updatedInfo;
    const packageType = updatedInfo.packageType;
    const paidFrom = updatedInfo.updatedAt;
    let paidTo = paidFrom;
    if(packageType==='MONTHLY') paidTo = incrementMonth(paidFrom, 1)
    else if(packageType==='BIANNUALY') paidTo=incrementMonth(paidFrom, 6)
    else if(packageType==='ANNUALY') paidTo=incrementMonth(paidFrom, 12)
    // When The order is for property payment
    const updatedProperty = await transactionClient.property.updateMany({
      where: {
        orders: { some: { orderId } },
      },
      data: { planType, packageType, paidFrom, paidTo },
    });

    if (!updatedInfo || !updatedProperty) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to update the order information.");
    }

    return updatedInfo;
  });
  return result;
};
export const OrderServices = {
  createOrder,
  getSingleOrder,
  updatePropertyTrialPeriod,
  updateOrderInfo,
  updateOrderStatusAndPropertyPlanType,
};
