/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import { infoLogger } from "../../../shared/logger";
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
// ! calculatePropertyOwnerProfileScore
export const calculatePropertyOwnerProfileScore = (data: any): number => {
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

  return profileScore;
};

// !@CodeQuivers
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
