import { ItemType } from "@prisma/client";

export type ISavedItem = {
  userId: string;
  tenantId: string;
  itemType: string;
};
export type ICreateSavedItem = {
  tenantId?: string;
  itemType: ItemType;
  userId: string;
  serviceProviderId?: string;
};
