import { z } from "zod";

const createProperty = z.object({
  id: z.number({
    required_error: "id (propertyId) is Required",
  }),
  numOfBed: z.number({
    required_error: "Number of Bed is Required",
  }),
  numOfBath: z.number({
    required_error: "Number of Bath is Required",
  }),
  address: z.string({
    required_error: "Address is Required",
  }),
  description: z.string({
    required_error: "Description is Required",
  }),
  maintenanceCoveredTenant: z.string({
    required_error: "Maintenance Covered Tenant is Required",
  }),
  maintenanceCoveredOwner: z.string({
    required_error: "Maintenance Covered Owner is Required",
  }),
  schools: z.string({
    required_error: "Style No is Required",
  }),
  universities: z.string({
    required_error: "Universities is Required",
  }),
  allowedPets: z.string({
    required_error: "Allowed Pets must is Required",
  }),
});
const updateProperty = z.object({
  numOfBed: z.number({}).optional(),
  numOfBath: z.number({}).optional(),
  address: z.string({}).optional(),
  description: z.string({}).optional(),
  maintenanceCoveredTenant: z.string({}).optional(),
  maintenanceCoveredOwner: z.string({}).optional(),
  schools: z.string({}).optional(),
  universities: z.string({}).optional(),
  allowedPets: z.string({}).optional(),
});

const propertyCreate = z.array(createProperty);

export const PropertiesValidation = {
  createProperty,
  updateProperty,
  propertyCreate,
};
