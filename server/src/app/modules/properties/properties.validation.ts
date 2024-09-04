import { z } from "zod";

const createProperty = z.object({
  fieldId: z.number(),
  title: z.string({}),
  numOfBed: z.number(),
  numOfBath: z.number(),
  address: z.string(),
  description: z.string(),
  maintenanceCoveredTenant: z.string(),
  maintenanceCoveredOwner: z.string(),
  schools: z.string(),
  universities: z.string(),
  allowedPets: z.string(),
  monthlyRent: z.number().min(1),
});
const updateProperty = z.object({
  title: z.string().optional(),
  numOfBed: z.number().optional(),
  numOfBath: z.number().optional(),
  address: z.string().optional(),
  description: z.string().optional().nullable(),
  maintenanceCoveredTenant: z.string().optional(),
  maintenanceCoveredOwner: z.string().optional(),
  schools: z.string().optional().nullable(),
  universities: z.string().optional().nullable(),
  allowedPets: z.string().optional().nullable(),
  monthlyRent: z.number().optional(),
  images: z.array(z.string()).optional(),
});

const propertyCreate = z.array(createProperty);

const updatePropertyDetailsFromAdmin = z.object({
  body: z.object({
    address: z.string().optional(),
    rentAmount: z.string().optional(),
    isRentPaid: z.boolean().optional(),
    paymentDeadline: z.string().optional(),
  }),
});
// ! assign tenant user

const assignTenant = z.object({
  body: z.object({
    tenantId: z.string(),
    propertyId: z.string(),
  }),
});

// ! remove tenant user

const removeTenant = z.object({
  body: z.object({
    tenantId: z.string(),
    propertyId: z.string(),
    reasonForRemove: z.string().min(1),
  }),
});

// ! assign serviceProvider
const assignServiceProvider = z.object({
  body: z.object({
    serviceProviderId: z.string(),
    propertyId: z.string(),
  }),
});

export const PropertiesValidation = {
  createProperty,
  updateProperty,
  propertyCreate,
  assignTenant,
  assignServiceProvider,
  removeTenant,
  updatePropertyDetailsFromAdmin,
};
