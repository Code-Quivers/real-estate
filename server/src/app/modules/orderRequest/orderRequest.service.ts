/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "../../../shared/prisma";

// ! get my pending orders
const getMyRequestedOrder = async (serviceProviderId: string) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const pendingOrders = await transactionClient.orderRequest.findMany({
      where: {
        serviceProviderId,
      },
      include: {
        property: {
          include: {
            _count: {
              select: {
                orderRequest: true,
              },
            },
          },
        },
      },
    });
    return pendingOrders;
  });
  return result;
};

export const TenantServices = {
  getMyRequestedOrder,
};
