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
      orderBy: {
        createdAt: "desc",
      },
    });

    return res;
  });
  return result;
};

// ! get all requested maintenances for property owner

const getRequestedMaintenanceForPropertyOwner = async (propertyOwnerId: string) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    //
    const res = await transactionClient.maintenanceRequest.findMany({
      where: {
        ownerId: propertyOwnerId,
        priority: {
          in: ["LOW_PRIORITY", "MEDIUM_PRIORITY"],
        },
        property: {
          isRented: true,
        },
        status: {
          equals: "PENDING",
        },
      },
      include: {
        property: true,
        serviceProvider: true,
        tenant: true,
        owner: true,
      },
    });

    return res;
  });
  return result;
};

// ! get all requested maintenances for Service Provider
const getRequestedMaintenanceForServiceProvider = async (serviceProviderId: string) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const res = await transactionClient.maintenanceRequest.findMany({
      where: {
        property: {
          isRented: true,
          serviceProviders: {
            some: {
              serviceProviderId,
            },
          },
        },

        OR: [
          {
            // if status is approved and priority is not high
            status: "APPROVED",
            priority: {
              not: "HIGH_PRIORITY",
            },
          },
          {
            // if status is pending and priority is high
            status: "PENDING",
            priority: "HIGH_PRIORITY",
          },
        ],
      },
      include: {
        property: true,
        serviceProvider: true,
        tenant: true,
        owner: true,
      },
    });
    return res;
  });
  return result;
};

// -------------------------------------------------------Update----------------------

// ! accept request and send to service providers
const acceptRequestMaintenanceForOwner = async (maintenanceRequestId: string, ownerId: string) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    // checking if the tenant is assigned to any property or not
    const isExistReq = await transactionClient.maintenanceRequest.findUnique({
      where: {
        maintenanceRequestId,
        ownerId,
      },
      select: {
        status: true,
      },
    });

    if (!isExistReq) throw new ApiError(httpStatus.BAD_REQUEST, "You have not assigned to any unit");
    if (isExistReq && isExistReq.status === "APPROVED") {
      throw new ApiError(httpStatus.BAD_REQUEST, "Already Approved !");
    }

    // ! updating
    const res = await transactionClient.maintenanceRequest.update({
      where: {
        maintenanceRequestId,
      },
      data: {
        status: "APPROVED",
      },
    });

    if (!res) throw new ApiError(httpStatus.BAD_REQUEST, "Failed to Accept, try again");
    return res;

    //
  });
  return result;
};

export const RequestMaintenanceService = {
  addRequestMaintenanceToPropertyOwner,
  getMyRequestedMaintenance,
  getRequestedMaintenanceForPropertyOwner,
  acceptRequestMaintenanceForOwner,
  getRequestedMaintenanceForServiceProvider,
};
