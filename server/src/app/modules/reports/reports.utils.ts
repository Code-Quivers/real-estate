/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ReportType } from "@prisma/client";
import { IChatUpdateRequest } from "./reports.interfaces";

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
export const reportTypePrefix = (reportType: ReportType): string => {
  switch (reportType) {
    case "MONTHLY":
      return "Monthly";
    case "ANNUALLY":
      return "Annual";
    default:
      return "";
  }
};
