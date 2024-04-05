/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { IUploadFile } from "../../../interfaces/file";
import { Request } from "express";
import { ITenantUpdateRequest, ITenantsFilterRequest } from "./tenants.interfaces";
import { deleteOldImage } from "../../../helpers/deleteOldImage";
import { updateTenantData } from "./tenants.utils";
import { Prisma, Tenant } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { tenantsRelationalFields, tenantsRelationalFieldsMapper, tenantsSearchableFields } from "./tenants.constants";

// ! get all tenants
const getAllTenants = async (filters: ITenantsFilterRequest, options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: tenantsSearchableFields.map((field: any) => ({
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
        if (tenantsRelationalFields.includes(key)) {
          return {
            [tenantsRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.TenantWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};
  //
  const result = await prisma.$transaction(async (transactionClient) => {
    const allTenants = await transactionClient.tenant.findMany({
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
      where: whereConditions,
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
              createdAt: "desc",
            },
    });

    const total = await prisma.tenant.count({
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
      data: allTenants,
    };
  });

  return result;
};
// ! get all Available tenants which are not already assigned
const getAllAvailableTenants = async (filters: ITenantsFilterRequest, options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: tenantsSearchableFields.map((field: any) => ({
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
        if (tenantsRelationalFields.includes(key)) {
          return {
            [tenantsRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.TenantWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};
  //
  const result = await prisma.$transaction(async (transactionClient) => {
    const allTenants = await transactionClient.tenant.findMany({
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
      where: {
        ...whereConditions,
        property: {
          is: null,
        },
      },
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
              createdAt: "desc",
            },
    });

    const total = await prisma.tenant.count({
      where: {
        ...whereConditions,
        property: {
          is: null,
        },
      },
    });
    const totalPage = Math.ceil(total / limit);
    return {
      meta: {
        page,
        limit,
        total,
        totalPage,
      },
      data: allTenants,
    };
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
  // const profileImagePath = profileImage?.path;
  const profileImagePath = profileImage?.path?.substring(13);

  const { oldProfileImagePath, AnnualSalary, CurrentCreditScore, affordableRentAmount, numberOfMember, ...updates } =
    req.body as ITenantUpdateRequest;

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

// ! get tenant my unit information


function differenceInMonths(date1: any, date2 = new Date()) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const yearDiff = d2.getFullYear() - d1.getFullYear();
  const monthDiff = d2.getMonth() - d1.getMonth();

  return yearDiff * 12 + monthDiff;
}

// get single tenant
const getMyUnitInformation = async (tenantId: string): Promise<Partial<Tenant> | null> => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const tenants = await transactionClient.tenant.findUnique({
      where: {
        tenantId,
      },
      select: {
        property: true,
        tenantId: true,
      },
    });
    if (!tenants) {
      throw new ApiError(httpStatus.BAD_REQUEST, "You haven't added to any property");
    }
    const propertyId = tenants.property?.propertyId;

    console.log(tenants, 'tenant unit information........')
    // if (!tenants) {
    //   throw new ApiError(httpStatus.BAD_REQUEST, "You haven't added to any property");
    // }
    const propertyId = tenants?.property?.propertyId;

    const orderData = await transactionClient.order.findMany({
      where: {
        tenantId: tenantId,
        properties: {
          some: { propertyId: propertyId },
        },
        orderStatus: "CONFIRMED",
      },
      select: {
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },


    })
    const dueMonths = differenceInMonths(orderData[0].updatedAt)
    const tenantUnitInfo = {
      ...tenants,
      dueRent: (tenants?.property?.monthlyRent || 0) * dueMonths,
      dueMonths: dueMonths
    }

    return tenantUnitInfo;
  });

  return result;
};

export const TenantServices = {
  getAllTenants,
  updateTenantProfile,
  getSingleTenant,
  getAllAvailableTenants,
  getMyUnitInformation,
};
