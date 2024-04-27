import { ReportType, ServiceAvailabilityEnum, ServiceType } from "@prisma/client";

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
export type IReportFilterRequest = {
  searchTerm?: string | undefined;
  createdAt?: string | undefined;
};

//
export type IInformationType = {
  image: string;
  monthlyRent: number;
  numOfBed: number;
  numOfBath: number;
  address: string;
  propertyId: string;
  tenantName: string;
  tenantPhoto: string | null | undefined;
};

export type IAddMonthlyOrAnnualReport = {
  reportType: ReportType;
  collectedRent: number;
  expenses: number;
  propertyId: string;
  information: IInformationType[];
};

export type IAddAnnuallyReport = {
  collectedRent: number;
  expenses: number;
  propertyId: string;
  rentAmount: number;
};
