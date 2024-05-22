import { Property } from "@prisma/client";
import { IPropertyData } from "./properties.interfaces";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const extractNonNullValues = <T extends Record<string, any>>(data: T): Partial<Property> => {
  const extractedData: any = {};
  Object.keys(data).forEach((key) => {
    if (data[key] !== null && data[key] !== undefined) {
      extractedData[key] = data[key];
    }
  });
  return extractedData;
};

// ! calculate Unit (  Property ) Score

export const calculateUnitScoreRatio = (
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

export const calculatePropertyScore = (data: IPropertyData | Property) => {
  const { description, schools, universities, allowedPets } = data;

  // Criteria weights for property scoring
  const criteriaWeights = {
    description: 10,
    schools: 10,
    universities: 10,
    allowedPets: 10,
  };
  let propertyScore = 60;

  // Calculate property score based on criteria
  const scoreFromProperty = (property: any, weight: number) => (property ? weight : 0);

  propertyScore += scoreFromProperty(description, criteriaWeights.description);
  propertyScore += scoreFromProperty(schools, criteriaWeights.schools);
  propertyScore += scoreFromProperty(universities, criteriaWeights.universities);
  propertyScore += scoreFromProperty(allowedPets, criteriaWeights.allowedPets);
  //
  console.log(data);

  const scoreRatio = calculateUnitScoreRatio(propertyScore, 100);
  return { propertyScore, scoreRatio };
};
