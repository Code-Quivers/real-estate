/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { IPropertyOwnerFilterRequest, IPropertyOwnerUpdateRequest } from "./propertyOwner.interfaces";
import { Request } from "express";
import { IUploadFile } from "../../../interfaces/file";
import { Prisma } from "@prisma/client";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import {
  propertyOwnerRelationalFields,
  propertyOwnerRelationalFieldsMapper,
  propertyOwnerSearchableFields,
} from "./propertyOwner.constants";
import bcrypt from "bcrypt";
import config from "../../../config";
import { calculatePropertyOwnerProfileScore, filterNonNullValues, removeOldFile } from "./propertyOwner.utils";

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
        _count: true,
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
      throw new ApiError(httpStatus.UNAUTHORIZED, "Property Owner Profile Not Found!!!");
    }
    // profile score ratio
    // const scoreRatio = calculatePropertyOwnerScoreRatio(propertyOwner.score, 100);
    // //  rented  unit score

    return propertyOwner;
  });

  return result;
};

// ! update property owner profile

const UpdatePropertyOwner = async (
  propertyOwnerId: string,
  req: Request,
  // payload: IPropertyOwner
) => {
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
      },
      _count: true,
    });

    // Calculate collected amount of rent for the current month.
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 since months are zero-based

    const data = await prisma.property.aggregate({
      _sum: {
        monthlyRent: true,
      },
      where: {
        ownerId: ownerId,
        isRented: true,
        isActive: true,
        orders: {
          some: {
            createdAt: {
              gte: new Date(currentDate.getFullYear(), currentMonth - 1, 1), // Beginning of the current month
              lt: new Date(currentDate.getFullYear(), currentMonth, 1), // Beginning of the next month
            },
          },
        },
      },
    });
    const collectedRentOfCurrentMonth: number = data?._sum?.monthlyRent || 0;

    // Calculate cost of the owner for the current month
    const paymentItems = await prisma.order.findMany({
      where: {
        ownerId: ownerId,
        createdAt: {
          gte: new Date(currentDate.getFullYear(), currentMonth - 1, 1), // Beginning of the current month
          lt: new Date(currentDate.getFullYear(), currentMonth, 1), // Beginning of the next month
        },
      },
      select: {
        PaymentInformation: {
          select: {
            amountPaid: true,
          },
        },
      },
    });

    const costOfCurrentMonth = paymentItems.reduce((acc, item) => {
      return acc + (item?.PaymentInformation?.amountPaid || 0);
    }, 0);

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
    let extraCosts;

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
      },
    });

    const getTotalUnits = await prisma.property.count({
      where: {
        ownerId,
      },
    });
    //

    return {
      numOfRentedUnit: numOfRentedUnit?._count || 0,
      collectedRentOfCurrentMonth,
      costOfCurrentMonth,
      extraCost: extraCosts,
      rentedUnitScoreRatio,
      myTotalUnits: getTotalUnits,
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

export const PropertyOwnerServices = {
  getAllPropertyOwners,
  getSinglePropertyOwner,
  UpdatePropertyOwner,
  getFinancialAccountInfo,
  getDashboardInfo,
  updateExtraCost,
};
