export const propertiesFilterableFields: string[] = [
  'propertyId',
  'searchTerm',
  'ownerId',
  // 'numOfBed',
  // 'numOfBath',
  'createdAt',
];

export const propertiesSearchableFields: string[] = ['address', 'description'];

export const propertiesRelationalFields: string[] = ['ownerId'];
export const propertiesRelationalFieldsMapper: { [key: string]: string } = {
  ownerId: 'ownerId',
};

export const ZodServiceAvailability = [
  'LOW_PRIORITY',
  'MEDIUM_PRIORITY',
  'HIGH_PRIORITY',
  'ALL_PRIORITIES',
];
export const ZodServiceType = [
  'TENANT_SCREENING',
  'MAINTENANCE_AND_REPAIR',
  'CLEANING',
  'PEST_CONTROL',
  'LAWN_CARE',
  'SECURITY_AND_SAFETY',
  'INSURANCE',
  'INSPECTION',
  'MARKETING',
  'TECHNOLOGY',
];
