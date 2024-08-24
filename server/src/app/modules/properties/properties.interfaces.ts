export type IPropertyData = {
  title: string;
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
  monthlyRent: number;
};
export type IPropertyReqPayload = {
  title: string;
  numOfBed: number;
  numOfBath: number;
  address: string;
  description: string;
  maintenanceCoveredTenant: string;
  maintenanceCoveredOwner: string;
  schools: string;
  universities: string;
  allowedPets: string;
  images?: string[]; // Optional property
  monthlyRent: number;
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
export type IRemoveTenantFromProperty = {
  tenantId: string;
  propertyId: string;
  reasonForRemove: string;
};
export type IAssignServiceProviderToProperty = {
  serviceProviderId: string;
  propertyId: string;
};

export type IPropertyUpdate = {
  address?: string;
  rentAmount?: number;
  isRentPaid?: boolean;
  paymentDeadline?: Date;
};
