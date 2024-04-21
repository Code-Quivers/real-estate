import { z } from "zod";
import {
  ZodMaintenanceIssueType,
  ZodMaintenancePriority,
  ZodMaintenanceUpdateStatus,
} from "./maintenanceRequest.constant";

const addMaintenanceRequest = z.object({
  isAnimal: z.boolean(),
  animalDetails: z.string().optional(),
  issueLocation: z.string(),
  priority: z.enum([...ZodMaintenancePriority] as [string, ...string[]]),
  issueType: z.enum([...ZodMaintenanceIssueType] as [string, ...string[]]),
  description: z.string(),
});
const UpdateMaintenanceRequest = z.object({
  body: z.object({
    status: z.enum([...ZodMaintenanceUpdateStatus] as [string, ...string[]], {
      required_error: "Status is Required",
    }),
  }),
});

export const MaintenanceRequestValidation = {
  addMaintenanceRequest,
  UpdateMaintenanceRequest,
};
