import { z } from "zod";
import { ZodMonthlyOrAnnualReportType } from "./reports.constants";

const information = z.object({
  address: z.string(),
  image: z.string(),
  monthlyRent: z.number(),
  numOfBath: z.number(),
  numOfBed: z.number(),
  propertyId: z.string(),
  tenantImage: z.string().optional(),
  tenantName: z.string(),
});

const addMonthlyOrAnnualReport = z.object({
  body: z.object({
    collectedRent: z.number(),
    expenses: z.number(),
    propertyId: z.string(),
    reportType: z.enum([...ZodMonthlyOrAnnualReportType] as [string, ...string[]]),
    information: z.array(information),
  }),
});

const sendMessage = z.object({
  text: z.string().optional(),
});

export const ReportsValidation = {
  addMonthlyOrAnnualReport,
  sendMessage,
};
