/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import { infoLogger } from "../../../shared/logger";
import prisma from "../../../shared/prisma";
export const filterNonNullValues = (data: any): any => {
  const filteredData: any = {};
  for (const key in data) {
    if (data[key] !== null && data[key] !== undefined) {
      filteredData[key] = data[key];
    }
  }
  return filteredData;
};

//  ! remove old file
export const removeOldFile = async (oldProfileImagePath: string | undefined, profileImagePath: string | undefined) => {
  const oldFilePaths = "uploads/" + oldProfileImagePath;

  if (oldProfileImagePath !== undefined && profileImagePath !== undefined) {
    fs.unlink(oldFilePaths, (err) => {
      if (err) {
        infoLogger.info("Error deleting old file");
      }
    });
  }
};

// ! Calculate the score ratio
export const calculatePropertyOwnerScoreRatio = (
  score: number,
  totalScore: number,
): {
  score: number;
  total: number;
} => {
  const ratio = (score / totalScore) * 10; // Scale to 10-based ratio
  const roundedRatio = Math.round(ratio);
  return { score: roundedRatio, total: 10 };
};

// ! calculatePropertyOwnerProfileScore
export const calculatePropertyOwnerProfileScore = (data: any) => {
  const {
    phoneNumber,
    profileImage,
    FinancialAccount,
    _count: { properties },
  } = data;

  let profileScore = 10;

  // Criteria weights
  const criteriaWeights = {
    phoneNumber: 20,
    profileImage: 10,
    financialAccountDetails: 15, // If financial account is not submitted
    submittedFinancialAccountDetails: 30, // If financial account is submitted
    properties: 30,
  };

  // Calculate profile score based on criteria
  if (phoneNumber) profileScore += criteriaWeights.phoneNumber;
  if (profileImage) profileScore += criteriaWeights.profileImage;
  if (FinancialAccount) {
    profileScore += FinancialAccount.detailsSubmitted
      ? criteriaWeights.submittedFinancialAccountDetails
      : criteriaWeights.financialAccountDetails;
  }
  if (properties > 0) profileScore += criteriaWeights.properties;

  //

  const scoreRatio = calculatePropertyOwnerScoreRatio(profileScore, 100);

  return { profileScore, scoreRatio };
};

export const getMonthlyTotalRentToCollect = async (propertyOwnerId: string): Promise<number> => {
  const property = await prisma.property.aggregate({
    where: { ownerId: propertyOwnerId, isRented: true, isActive: true },
    _sum: {
      monthlyRent: true,
    },
  });
  return property._sum.monthlyRent || 0;
};

// !
export const getLastMonthTotalCollectedRent = async (ownerId: string): Promise<number> => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 since months are zero-based
  const data = await prisma.property.findMany({
    where: {
      ownerId: ownerId,
      isRented: true,
      isActive: true,
      orders: {
        some: {
          updatedAt: {
            gte: new Date(currentDate.getFullYear(), currentMonth - 1, 1), // Beginning of the current month
            lt: new Date(currentDate.getFullYear(), currentMonth, 1), // Beginning of the next month
          },
        },
      },
    },
    select: {
      orders: {
        select: {
          PaymentInformation: {
            select: {
              amountPaid: true,
            },
          },
        },
      },
    },
  });
  let totalCollectedRent = 0;
  for (const item of data as any) {
    for (const it of item?.orders as any) {
      totalCollectedRent += (it?.PaymentInformation?.amountPaid || 0);
    }
  }
  return totalCollectedRent || 0;
};

export const getOwnerTotalCostOfCurrentMonth = async (ownerId: string): Promise<number> => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 since months are zero-based

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
  const totalCost = paymentItems.reduce((acc, item) => {
    return acc + (item?.PaymentInformation?.amountPaid || 0);
  }, 0);

  return totalCost;
};
// !@CodeQuivers
