/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { Service } from "@prisma/client";
import { IServiceUpdateRequest } from "./services.interfaces";
import { updateServiceData } from "./services.utils";

// ! createOrUpdateService
const createOrUpdateService = async (profileId: string, payload: IServiceUpdateRequest): Promise<Service> => {
  // updated data from request
  const newServiceData: Partial<Service> = updateServiceData(payload);

  // !
  const result = await prisma.$transaction(async (transactionClient) => {
    //

    const property = await transactionClient.service.upsert({
      where: { ownerId: profileId },
      update: newServiceData,
      create: {
        ownerId: profileId,
        ...newServiceData,
      },
      include: {
        owner: true,
      },
    });
    if (!property) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Service Update Failed !");
    }
    return property;
  });
  return result;
};

export const PropertiesService = {
  createOrUpdateService,
};
