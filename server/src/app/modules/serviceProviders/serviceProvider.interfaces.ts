import { ServiceAvailabilityEnum } from "@prisma/client";

export type IServiceProviderUpdateRequest = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  oldProfileImagePath?: string;
  companyName?: string;
  companyAddress?: string;
  companyPhoneNumber?: string;
  companyEmailAddress?: string;
};
export type IServiceProviderFilterRequest = {
  searchTerm?: string | undefined;
  serviceAvailability?: ServiceAvailabilityEnum | undefined;
};

export type ServiceData = {
  serviceId?: string;
  minPrice?: number;
  maxPrice?: number;
  serviceDescription?: string;
  serviceLocation?: string;
  serviceCancellationPolicy?: string;
};
