/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { IUploadFile } from "../../../interfaces/file";
import { Request } from "express";
import { ITenantUpdateRequest } from "./tenants.interfaces";
import { deleteOldImage } from "../../../helpers/deleteOldImage";
import { updateTenantData } from "./tenants.utils";
import { Tenant } from "@prisma/client";

// ! get all tenants
const getTenants = async () => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const tenants = await transactionClient.tenant.findMany({
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!tenants) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Tenant fetching failed !");
    }
    return tenants;
  });

  return result;
};
// get single tenant
const getSingleTenant = async (tenantId: string): Promise<Tenant | null> => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const tenants = await transactionClient.tenant.findUnique({
      where: {
        tenantId,
      },
      include: {
        user: {
          select: {
            email: true,
            createdAt: true,
          },
        },
      },
    });

    if (!tenants) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Tenant Profile Not Found!!!");
    }
    return tenants;
  });

  return result;
};
//  ! update tenant profile data========================================================
const updateTenantProfile = async (tenantId: string, req: Request) => {
  const profileImage: IUploadFile = req.file as any;
  // const profileImagePath = profileImage?.path?.substring(13);
  const profileImagePath = profileImage?.path;

  const { oldProfileImagePath, AnnualSalary, CurrentCreditScore, affordableRentAmount, numberOfMember, ...updates } = req.body as ITenantUpdateRequest;

  const tenantReqData = {
    AnnualSalary: Number(AnnualSalary),
    CurrentCreditScore: Number(CurrentCreditScore),
    numberOfMember: Number(numberOfMember),
    affordableRentAmount: Number(affordableRentAmount),
    profileImage: profileImagePath,
    ...updates,
  };

  //! deleting old  Image
  if (profileImagePath) deleteOldImage(oldProfileImagePath, profileImagePath);

  //!
  const result = await prisma.$transaction(async (transactionClient) => {
    const isTenantProfileExists = await transactionClient.tenant.findUnique({
      where: {
        tenantId,
      },
    });

    if (!isTenantProfileExists) throw new ApiError(httpStatus.NOT_FOUND, "Tenant Profile Not Found!");

    // updated data from request
    const newTenantData: Partial<ITenantUpdateRequest> = updateTenantData(tenantReqData);

    // ! updating
    const res = await transactionClient.tenant.update({
      where: {
        tenantId,
      },
      data: newTenantData,
    });

    if (!res) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Tenant Profile Updating Failed !");
    }

    return res;
  });
  return result;
};

export const TenantServices = {
  getTenants,
  updateTenantProfile,
  getSingleTenant,
};
