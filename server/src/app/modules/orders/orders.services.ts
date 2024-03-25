/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";

// ! get single order details
const getSingleOrder = async (orderId: string) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const res = await transactionClient.order.findUnique({
      where: {
        orderId,
      },
    });
    if (!res) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Order not Found");
    }
    return res;
  });
  return result;
};

export const SavedItemServices = {
  getSingleOrder,
};
