/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { IPropertyOwnerFilterRequest, IPropertyOwnerUpdateRequest } from "./propertyOwner.interfaces";
import { Request } from "express";
import { IUploadFile } from "../../../interfaces/file";
import { Prisma, Property } from "@prisma/client";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import {
  propertyOwnerRelationalFields,
  propertyOwnerRelationalFieldsMapper,
  propertyOwnerSearchableFields,
} from "./propertyOwner.constants";
import bcrypt from "bcrypt";
import config from "../../../config";
import {
  calculatePropertyOwnerProfileScore,
  filterNonNullValues,
  getLastMonthTotalCollectedRent,
  getMonthlyTotalRentToCollect,
  getOwnerTotalCostOfCurrentMonth,
  removeOldFile,
} from "./propertyOwner.utils";

// ! get all property owners
const getAllPropertyOwners = async (filters: IPropertyOwnerFilterRequest, options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: propertyOwnerSearchableFields.map((field: any) => ({
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
        if (propertyOwnerRelationalFields.includes(key)) {
          return {
            [propertyOwnerRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.PropertyOwnerWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};
  //
  const result = await prisma.$transaction(async (transactionClient) => {
    const allPropertyOwner = await transactionClient.propertyOwner.findMany({
      include: {
        user: true,
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

    const total = await prisma.propertyOwner.count({
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
      data: allPropertyOwner,
    };
  });

  return result;
};

// ! get single Property Owner
const getSinglePropertyOwner = async (propertyOwnerId: string): Promise<any | null> => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const propertyOwner = await transactionClient.propertyOwner.findUnique({
      where: {
        propertyOwnerId,
        user: {
          userStatus: {
            in: ["ACTIVE", "PAUSED"],
          },
        },
      },
      select: {
        lastName: true,
        firstName: true,
        createdAt: true,
        phoneNumber: true,
        profileImage: true,
        propertyOwnerId: true,
        score: true,
        userId: true,
        updatedAt: true,
        _count: {
          select: {
            maintenanceRequests: true,
            properties: {
              where: {
                planType: {
                  in: ["ON_TRIAL", "PREMIUM"],
                },
              },
            },
          },
        },
        scoreRatio: true,
        user: {
          select: {
            email: true,
            createdAt: true,
            userName: true,
            role: true,
            userStatus: true,
          },
        },
      },
    });

    if (!propertyOwner) {
      throw new ApiError(httpStatus.NOT_FOUND, "Property Owner Profile Not Found!!!");
    }
    // profile score ratio
    // const scoreRatio = calculatePropertyOwnerScoreRatio(propertyOwner.score, 100);
    // //  rented  unit score

    return propertyOwner;
  });

  return result;
};

// ! update property owner profile

const UpdatePropertyOwner = async (propertyOwnerId: string, req: Request) => {
  const profileImage: IUploadFile = req.file as any;
  const profileImagePath = profileImage?.path?.substring(13);
  const { firstName, lastName, phoneNumber, oldProfileImagePath, password } = req.body as IPropertyOwnerUpdateRequest;

  // deleting old style Image
  if (profileImagePath) await removeOldFile(oldProfileImagePath, profileImagePath);

  // !
  const result = await prisma.$transaction(async (transactionClient) => {
    const isPropertyOwnerExists = await transactionClient.propertyOwner.findUnique({
      where: {
        propertyOwnerId,
      },
    });

    if (!isPropertyOwnerExists) {
      throw new ApiError(httpStatus.NOT_FOUND, "Property Owner Not Found!");
    }

    const updatedPropertyOwnerProfileData: any = filterNonNullValues({
      firstName,
      lastName,
      phoneNumber,
      profileImage: profileImagePath,
    });

    // ! updating
    const res = await transactionClient.propertyOwner.update({
      where: {
        propertyOwnerId,
      },
      data: updatedPropertyOwnerProfileData,
      include: {
        FinancialAccount: true,
        _count: {
          select: {
            properties: true,
          },
        },
      },
    });
    if (!res) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Property Owner Updating Failed !");
    }
    // updating profile score
    if (res) {
      const profileScore = calculatePropertyOwnerProfileScore(res);
      await transactionClient.propertyOwner.update({
        where: {
          propertyOwnerId,
        },
        data: {
          score: profileScore.profileScore,
          scoreRatio: profileScore.scoreRatio,
        },
      });
    }
    //  if provided password
    if (password) {
      const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
      await transactionClient.user.update({
        where: {
          userId: res?.userId,
        },
        data: {
          password: hashedPassword,
        },
      });
    }

    return res;
  });
  return result;
};
// ! get financial info
const getFinancialAccountInfo = async (ownerId: string) => {
  try {
    const finAcctData = await prisma.financialAccount.findUnique({
      where: { ownerId },
    });
    return finAcctData;
  } catch (err) {
    console.log(err);
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to get data!");
  }
};
// ! get dashboard info

const getDashboardInfo = async (ownerId: string) => {
  try {
    // Find number of rented unit for the owner
    const numOfRentedUnit = await prisma.property.aggregate({
      where: {
        ownerId: ownerId,
        isRented: true,
        isActive: true,
        planType: {
          in: ["ON_TRIAL", "PREMIUM"],
        },
      },
      _count: true,
    });

    const currentDate = new Date();

    const collectedRentOfCurrentMonth: number = await getLastMonthTotalCollectedRent(ownerId);
    const costOfCurrentMonth: number = await getOwnerTotalCostOfCurrentMonth(ownerId);

    // get extra cost
    const getExtraCost = await prisma.propertyOwner.findUnique({
      where: {
        propertyOwnerId: ownerId,
      },
      select: {
        extraCosts: true,
      },
    });
    const currentMonths = currentDate.getMonth(); // Month is zero-based
    const currentYear = currentDate.getFullYear();
    let extraCosts: any;

    if (getExtraCost) {
      // Find the index of the object corresponding to the current month
      const currentMonthIndex = getExtraCost.extraCosts.findIndex((cost: any) => {
        const costDate = new Date(cost.month);
        return costDate.getMonth() === currentMonths && costDate.getFullYear() === currentYear;
      });

      // If the current month's object is found, assign it to extraCosts
      if (currentMonthIndex !== -1) {
        extraCosts = getExtraCost.extraCosts[currentMonthIndex];
      }
    }

    // rented unit score
    const rentedUnitScoreRatio = await prisma.property.count({
      where: {
        ownerId,
        isRented: true,
        planType: {
          in: ["ON_TRIAL", "PREMIUM"],
        },
      },
    });

    const getTotalUnits = await prisma.property.count({
      where: {
        ownerId,
        planType: {
          in: ["ON_TRIAL", "PREMIUM"],
        },
      },
    });

    const monthlyTotalRentToCollect: number = await getMonthlyTotalRentToCollect(ownerId);
    const currentMonthExtraCost: number = extraCosts?.cost || 0;

    return {
      numOfRentedUnit: numOfRentedUnit?._count || 0,
      collectedRentOfCurrentMonth,
      costOfCurrentMonth,
      extraCost: extraCosts,
      rentedUnitScoreRatio,
      myTotalUnits: getTotalUnits,
      monthlyTotalRentToCollect,
      monthlyTotalCost: costOfCurrentMonth + currentMonthExtraCost,
    };
  } catch (err) {
    console.log(err);
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to get dashboard info");
  }
};

// !update extra cost
const updateExtraCost = async (propertyOwnerId: string, data: { cost: string }) => {
  return await prisma.$transaction(async (transactionClient) => {
    // Retrieve existing extraCosts
    const previousCostDetails = await transactionClient.propertyOwner.findUnique({
      where: {
        propertyOwnerId,
      },
      select: {
        extraCosts: true,
      },
    });

    if (!previousCostDetails) {
      throw new Error("Cost Not found");
    }

    // Extract current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Month is zero-based
    const currentYear = currentDate.getFullYear();

    // Check if a cost entry for the current month already exists
    const isExistCurrentMonthCost = previousCostDetails.extraCosts.some((cost: any) => {
      const costDate = new Date(cost.month);
      return costDate.getMonth() === currentMonth && costDate.getFullYear() === currentYear;
    });

    // If a cost entry for the current month does not exist, add it
    if (!isExistCurrentMonthCost) {
      const updatedData: any = [
        ...previousCostDetails.extraCosts,
        {
          month: new Date(),
          cost: data.cost,
        },
      ];

      return await transactionClient.propertyOwner.update({
        where: {
          propertyOwnerId,
        },
        data: {
          extraCosts: updatedData,
        },
        select: {
          extraCosts: true,
        },
      });
    } else {
      const currentMonthDataIndex = previousCostDetails.extraCosts.findIndex((cost: any) => {
        const costDate = new Date(cost.month);
        return costDate.getMonth() === currentMonth && costDate.getFullYear() === currentYear;
      });

      // If current month data exists, update it and push to updatedData array
      if (currentMonthDataIndex !== -1) {
        const updatedCurrentMonthData: any = previousCostDetails.extraCosts[currentMonthDataIndex];

        // Perform the update operation on updatedCurrentMonthData as needed

        updatedCurrentMonthData.cost = data.cost;
        const updatedData: any = [...previousCostDetails.extraCosts];
        updatedData[currentMonthDataIndex] = updatedCurrentMonthData;

        return await transactionClient.propertyOwner.update({
          where: {
            propertyOwnerId,
          },
          data: {
            extraCosts: updatedData,
          },
        });
      }
    }
  });
};

// ! get my assigned tenants
const getMyAssignedTenants = async (propertyOwnerId: string): Promise<Property[] | null> => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const myTenants = await transactionClient.property.findMany({
      where: {
        ownerId: propertyOwnerId,
        isRented: true,
      },
      include: {
        Tenant: true,
      },
    });

    if (!myTenants?.length) {
      throw new ApiError(httpStatus.NOT_FOUND, "No Tenants Found !");
    }

    return myTenants;
  });

  return result;
};

// ! delete single Property Owner (Superadmin)
const deletePropertyOwnerData = async (propertyOwnerId: string): Promise<any | null> => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const propertyOwner = await transactionClient.propertyOwner.findUnique({
      where: {
        propertyOwnerId,
      },
    });

    if (!propertyOwner) {
      throw new ApiError(httpStatus.NOT_FOUND, "Property Owner Not Found!!!");
    }

    // ! checking if any assigned tenant
    const getAllAssignedTenant = await transactionClient.tenant.findMany({
      where: {
        property: {
          ownerId: propertyOwnerId,
          isRented: true,
        },
      },
      select: {
        tenantId: true,
        property: {
          select: {
            isRented: true,
          },
        },
      },
    });
    if (getAllAssignedTenant?.length > 0) {
      // Use Promise.all to handle asynchronous operations within the map
      await Promise.all(
        getAllAssignedTenant?.map(async (tenant) => {
          // update logic
          const removingTenant = await transactionClient.tenant.update({
            where: {
              tenantId: tenant?.tenantId, // use tenantId here for the update
            },
            data: {
              property: {
                disconnect: true,
                update: {
                  isRented: false,
                },
              },
            },
          });

          if (!removingTenant) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Tenant remove Failed");
          }
        }),
      );
    } // ! removing all assigned tenant finished

    // ! removing all assigned service provider
    const getAllAssignedServiceProviders = await transactionClient.serviceProvider.findMany({
      where: {
        properties: {
          some: {
            ownerId: propertyOwnerId,
          },
        },
      },
      select: {
        serviceProviderId: true,
        properties: {
          select: {
            propertyId: true,
            ownerId: true,
          },
          where: {
            ownerId: propertyOwnerId,
          },
        },
      },
    });

    if (getAllAssignedServiceProviders?.length > 0) {
      await Promise.all(
        getAllAssignedServiceProviders.map(async (serviceProvider: any) => {
          const removingServiceProvider = await transactionClient.serviceProvider.update({
            where: {
              serviceProviderId: serviceProvider?.serviceProviderId,
            },
            data: {
              properties: {
                disconnect: serviceProvider?.properties?.map((property: any) => ({
                  propertyId: property?.propertyId,
                })),
              },
            },
          });

          if (!removingServiceProvider) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Service Providers remove Failed");
          }
        }),
      );
    }

    // ! removing all properties owned by property owner
    const removingAllProperties = await transactionClient.property.deleteMany({
      where: {
        ownerId: propertyOwnerId,
      },
    });

    if (!removingAllProperties) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Properties removing Failed");
    }
    // ! removing property owner
    const removingPropertyOwner = await transactionClient.propertyOwner.delete({
      where: {
        propertyOwnerId,
      },
    });

    if (!removingPropertyOwner) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Property Owner removing Failed");
    }

    //
    return removingPropertyOwner;
  });

  return result;
};

export const PropertyOwnerServices = {
  getAllPropertyOwners,
  getSinglePropertyOwner,
  UpdatePropertyOwner,
  getFinancialAccountInfo,
  getDashboardInfo,
  updateExtraCost,
  getMyAssignedTenants,
  deletePropertyOwnerData,
};
