export const serviceProviderFilterableFields: string[] = ["searchTerm", "ServiceType", "serviceAvailability"];

export const serviceProviderSearchableFields: string[] = ["firstName", "lastName", "phoneNumber"];

export const serviceProviderRelationalFields: string[] = ["ServiceType", "serviceAvailability"];

export const serviceProviderRelationalFieldsMapper: { [key: string]: string } = {
  ServiceType: "serviceType",
  serviceAvailability: "serviceAvailability",
};
