import { RequestMaintenancePriorityEnum, ServiceType } from "@prisma/client";

export type ISavedItem = {
  userId: string;
  tenantId: string;
  itemType: string;
};
export type IAddRequestMaintenance = {
  isAnimal: boolean;
  animalDetails?: string;
  issueLocation: string;
  priority: RequestMaintenancePriorityEnum;
  issueType: ServiceType;
  description: string;
};
