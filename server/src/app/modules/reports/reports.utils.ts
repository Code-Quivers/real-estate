/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ReportType } from "@prisma/client";

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
