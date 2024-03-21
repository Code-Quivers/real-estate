import { z } from "zod";
import { ZodMaintenanceIssueType, ZodMaintenancePriority } from "./maintenanceRequest.constant";

const addMaintenanceRequest = z.object({
  isAnimal: z.boolean(),
  animalDetails: z.string().optional(),
  issueLocation: z.string(),
  priority: z.enum([...ZodMaintenancePriority] as [string, ...string[]]),
  issueType: z.enum([...ZodMaintenanceIssueType] as [string, ...string[]]),
  description: z.string(),
});

export const MaintenanceRequestValidation = {
  addMaintenanceRequest,
};
