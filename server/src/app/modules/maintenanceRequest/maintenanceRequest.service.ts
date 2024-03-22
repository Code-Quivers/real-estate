/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";
import { IUploadFile } from "../../../interfaces/file";
import prisma from "../../../shared/prisma";
import { IAddRequestMaintenance } from "./maintenanceRequest.interfaces";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

// ! add request maintenance request to property owner from tenant user
const addRequestMaintenanceToPropertyOwner = async (tenantId: string, req: Request) => {
  // Ensure req.files and req.body exist and have correct types
  const images: IUploadFile[] = (req.files as any) || [];

  console.log(images);

  const { isAnimal, description, issueLocation, issueType, priority, animalDetails } =
    req?.body as IAddRequestMaintenance;
  // Process images
  const imagesPath: string[] = images?.map((image) => `maintenance-requests/${image.filename}`) ?? [];
  const newData = { isAnimal, description, issueLocation, issueType, priority, animalDetails, images: imagesPath };

  const result = await prisma.$transaction(async (transactionClient) => {
    // checking if the tenant is assigned to any property or not
    const isAssigned = await transactionClient.tenant.findUnique({
      where: {
        tenantId,
        property: {
          isNot: null,
        },
      },
      select: {
        propertyId: true,
        property: {
          select: {
            ownerId: true,
          },
        },
      },
    });

    if (!isAssigned) throw new ApiError(httpStatus.BAD_REQUEST, "You have not assigned to any unit");
    //

    // check if

    const res = await transactionClient.maintenanceRequest.create({
      data: {
        propertyId: isAssigned?.propertyId as string,
        tenantId,
        ownerId: isAssigned?.property?.ownerId as string,
        ...newData,
      },
    });

    if (!res) throw new ApiError(httpStatus.BAD_REQUEST, "Failed to add Maintenance Request");
    return res;
  });
  return result;
};

// ! get my(tenant) requested maintenances

const getMyRequestedMaintenance = async (tenantId: string) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const isAssigned = await transactionClient.tenant.findUnique({
      where: {
        tenantId,
        property: {
          isNot: null,
        },
      },
      select: {
        propertyId: true,
      },
    });

    if (!isAssigned) throw new ApiError(httpStatus.BAD_REQUEST, "You haven't assigned to unit");

    //
    const res = await transactionClient.maintenanceRequest.findMany({
      where: {
        tenantId,
        propertyId: isAssigned?.propertyId as string,
      },
      include: {
        owner: true,
        property: true,
        serviceProvider: true,
      },
    });

    return res;
  });
  return result;
};

export const RequestMaintenanceService = {
  addRequestMaintenanceToPropertyOwner,
  getMyRequestedMaintenance,
};
