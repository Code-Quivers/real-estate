import { RequestMaintenancePriorityEnum } from "@prisma/client";

export type IAddRequestMaintenance = {
  isAnimal: boolean;
  animalDetails?: string;
  issueLocation: string;
  priority: RequestMaintenancePriorityEnum;
  issueType: string;
  description: string;
};
export type IUpdateRequestMaintenance = {
  status: "PAUSED" | "COMPLETED";
};
