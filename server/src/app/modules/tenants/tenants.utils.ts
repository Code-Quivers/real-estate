/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tenant } from "@prisma/client";
import { ITenantUpdateRequest } from "./tenants.interfaces";

type UpdateValueType = string | number | boolean;

type UpdateDataObject = {
  [dataName: string]: UpdateValueType;
};

export const updateTenantData = (updates: UpdateDataObject): Partial<ITenantUpdateRequest> => {
  const filteredUpdates = Object.entries(updates)
    .filter(([_, value]) => value !== undefined && value !== null && !Number.isNaN(value))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return {
    ...filteredUpdates,
  };
};

// ! calculate  Tenant ProfileScore

export const calculateTenantScoreRatio = (
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

// Interface for the data object
type TenantData = {
  phoneNumber?: any;
  profileImage?: any;
  prevLandlordName?: any;
  prevLandlordContactInfo?: any;
  lengthOfPrevTenancy?: any;
  leavingReason?: any;
  isAnyLatePaymentReason?: any;
  CurrentEmployerOrBusinessName?: any;
  AnnualSalary?: any;
  isPets?: any;
  typeOfPets?: any;
  isPetVaccinated?: any;
  isSmoker?: any;
  allergies?: any;
  isWillingToSignLeasingAgreement?: any;
  isAnyExtraToMention?: any;
};
type CriteriaKey = keyof TenantData;

// Function to calculate Tenant Profile Score
export const calculateTenantProfileScore = (data: TenantData) => {
  let profileScore = 10; // Start with a base score of 10

  // Criteria weights
  const criteriaWeights: { [key: string]: number } = {
    // should be total 54
    profileImage: 6,
    dateOfBirth: 6,
    socialSecurityNumber: 6,
    presentAddress: 6,
    phoneNumber: 6,
    isCriminalRecord: 6,
    placeToRent: 6,
    affordableRentAmount: 6,
    isPets: 6,
    // others should be in total 36
    criminalRecordDescription: 2,
    prevLandlordName: 2,
    prevLandlordContactInfo: 2,
    lengthOfPrevTenancy: 2,
    leavingReason: 2,
    isAnyLatePaymentReason: 1,
    CurrentEmployerOrBusinessName: 1,
    CurrentEmployerOrBusinessContactInfo: 1,
    JobTitle: 2,
    AnnualSalary: 2,
    OtherIncomeSource: 2,
    CurrentCreditScore: 2,
    typeOfPets: 2,
    isPetVaccinated: 2,
    isSmoker: 2,
    allergies: 2,
    isHaveOtherMember: 2,
    numberOfMember: 2,
    isWillingToSignLeasingAgreement: 2,
    isAnyExtraToMention: 1,
  };

  // Calculate profile score based on criteria
  for (const criterion in data) {
    const value = data[criterion as CriteriaKey];

    if (value !== undefined && value !== "" && value !== null && criteriaWeights[criterion as CriteriaKey]) {
      profileScore += criteriaWeights[criterion as CriteriaKey];
    }
  }

  // getting ratio
  const scoreRatio = calculateTenantScoreRatio(profileScore, 100);
  return {
    profileScore,
    scoreRatio,
  };
};

// ! Calculate the score ratio

export function differenceInMonths(date1: any, date2 = new Date()) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const yearDiff = d2.getFullYear() - d1.getFullYear();
  const monthDiff = d2.getMonth() - d1.getMonth();

  console.log(d1);
  console.log(d2);
  console.log(monthDiff);

  return yearDiff * 12 + monthDiff;
}
