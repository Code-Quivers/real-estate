import { Property } from "@prisma/client";

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
