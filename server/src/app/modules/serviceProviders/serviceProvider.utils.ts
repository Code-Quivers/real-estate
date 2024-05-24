import { Service } from "@prisma/client";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const filterUndefinedOrNullValues = (obj: Record<string, any>): Record<string, any> => {
  const filteredObj: Record<string, any> = {};
  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      filteredObj[key] = obj[key];
    }
  }
  return filteredObj;
};

//  updating profile score

// ! calculate    ProfileScore

export const calculateServiceProviderScoreRatio = (
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
type ServiceProviderData = {
  profileImage?: any;
  phoneNumber?: any;
  companyName?: string;
  companyAddress?: string;
  companyPhoneNumber?: string;
  companyEmailAddress?: string;
  Service?: Service;
};

type CriteriaKey = keyof ServiceProviderData;
type ServiceProviderCriteriaWeights = {
  profileImage: number;
  phoneNumber: number;
  companyName: number;
  companyAddress: number;
  companyPhoneNumber: number;
  companyEmailAddress: number;
  Service: any;
};
// Criteria weights

const criteriaWeights: ServiceProviderCriteriaWeights = {
  profileImage: 6,
  phoneNumber: 6,
  companyName: 6,
  companyAddress: 6,
  companyPhoneNumber: 6,
  companyEmailAddress: 6,
  // Nested criteria weights for Service
  Service: {
    minPrice: 9,
    maxPrice: 9,
    serviceDescription: 9,
    serviceLocation: 9,
    serviceCancellationPolicy: 9,
    serviceAvailability: 9,
  },
};

export const calculateServiceProviderProfileScore = (data: ServiceProviderData) => {
  let profileScore = 10; // Start with a base score of 10

  // Calculate profile score based on criteria
  for (const criterion in data) {
    const value = data[criterion as CriteriaKey];

    // Skip if the value is falsy (null, undefined, or empty string)
    if (!value) {
      continue;
    }

    const weight = criteriaWeights[criterion as CriteriaKey];

    if (weight) {
      if (criterion === "Service") {
        const serviceCriteria = data[criterion] as Service;
        const serviceWeights = weight as { [key: string]: number };

        for (const serviceCriterion in serviceCriteria) {
          const serviceValue = serviceCriteria[serviceCriterion as keyof Service];

          // Skip if the serviceValue is falsy (null, undefined, or empty string)
          if (!serviceValue) {
            continue;
          }

          const serviceWeight = serviceWeights[serviceCriterion];

          if (serviceWeight) {
            profileScore += serviceWeight;
          }
        }
      } else {
        profileScore += weight;
      }
    }
  }

  // Getting ratio
  const scoreRatio = calculateServiceProviderScoreRatio(profileScore, 100);

  return { profileScore, scoreRatio };
};
