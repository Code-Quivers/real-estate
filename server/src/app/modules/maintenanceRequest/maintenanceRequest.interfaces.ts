import { RequestMaintenancePriorityEnum, ServiceType } from "@prisma/client";

export type IAddRequestMaintenance = {
  isAnimal: boolean;
  animalDetails?: string;
  issueLocation: string;
  priority: RequestMaintenancePriorityEnum;
  issueType: ServiceType;
  description: string;
};
export type IUpdateRequestMaintenance = {
  status: "PAUSED" | "COMPLETED";
};
