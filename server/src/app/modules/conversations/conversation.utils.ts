/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { IChatUpdateRequest } from "./conversation.interfaces";

type UpdateValueType = string | number | boolean;

type UpdateDataObject = {
  [dataName: string]: UpdateValueType;
};

export const updateServiceData = (updates: UpdateDataObject): Partial<IChatUpdateRequest> => {
  const filteredUpdates = Object.entries(updates)
    .filter(([_, value]) => value !== undefined && value !== null && !Number.isNaN(value))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return {
    ...filteredUpdates,
  };
};
import { Messages } from "@prisma/client";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const extractNonNullValues = <T extends Record<string, any>>(data: T): Partial<Messages> => {
  const extractedData: any = {};
  Object.keys(data).forEach((key) => {
    if (data[key] !== null && data[key] !== undefined) {
      extractedData[key] = data[key];
    }
  });
  return extractedData;
};
