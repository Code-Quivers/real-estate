export const chatFilterableFields: string[] = [
  "serviceId",
  "searchTerm",
  "ownerId",
  "serviceType",
  "serviceAvailability",
];

export const chatSearchableFields: string[] = ["address", "description"];

export const chatRelationalFields: string[] = ["ownerId"];
export const chatRelationalFieldsMapper: { [key: string]: string } = {
  ownerId: "ownerId",
};

export const ZodServiceAvailability = ["LOW_PRIORITY", "MEDIUM_PRIORITY", "HIGH_PRIORITY", "ALL_PRIORITIES"];
export const ZodServiceType = [
  "TENANT_SCREENING",
  "MAINTENANCE_AND_REPAIR",
  "CLEANING",
  "PEST_CONTROL",
  "LAWN_CARE",
  "SECURITY_AND_SAFETY",
  "INSURANCE",
  "INSPECTION",
  "MARKETING",
  "TECHNOLOGY",
];
export const ZodMonthlyOrAnnualReportType = ["MONTHLY", "ANNUALLY"];
