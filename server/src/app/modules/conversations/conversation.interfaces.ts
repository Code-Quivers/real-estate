import { ServiceAvailabilityEnum, ServiceType } from "@prisma/client";

export type ISendMessage = {
  text: string;
};

export type IChatUpdateRequest = {
  servicePriceRange?: string;
  serviceDescription?: string;
  serviceLocation?: string;
  serviceCancellationPolicy?: string;
  serviceAvailability?: ServiceAvailabilityEnum;
  serviceType?: ServiceType;
};
export type IChatFilterRequest = {
  searchTerm?: string | undefined;
  createdAt?: string | undefined;
};
