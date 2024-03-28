/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";

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
        owner: true,
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
  })

  if (!updatedInfo) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to update the order information.")
  }

  return updatedInfo;
}


export const OrderServices = {
  getSingleOrder,
  updatePropertyTrialPeriod,
  updateOrderInfo
};
