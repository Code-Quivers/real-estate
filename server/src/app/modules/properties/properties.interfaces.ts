import { IUploadFile } from "../../../interfaces/file";

export type IPropertyData = {
  ownerId: string;
  numOfBed: number;
  numOfBath: number;
  address: string;
  description: string;
  maintenanceCoveredTenant: string;
  maintenanceCoveredOwner: string;
  schools: string;
  universities: string;
  allowedPets: string;
  profileId: string;
  images: string[];
  monthlyRend: number;
};
export type IPropertyReqPayload = {
  numOfBed: number;
  numOfBath: number;
  address: string;
  description: string;
  maintenanceCoveredTenant: string;
  maintenanceCoveredOwner: string;
  schools: string;
  universities: string;
  allowedPets: string;
};
export type IPropertiesFilterRequest = {
  searchTerm?: string | undefined;
  propertyId?: string | undefined;
  ownerId?: string | undefined;
  // numOfBed?: number | undefined;
  // numOfBath?: number | undefined;
  createdAt?: string | undefined;
};

export type IAssignTenantToProperty = {
  tenantId: string;
  propertyId: string;
};
export type IAssignServiceProviderToProperty = {
  serviceProviderId: string;
  propertyId: string;
};
