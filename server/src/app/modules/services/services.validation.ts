import { z } from 'zod';
import { ZodServiceAvailability, ZodServiceType } from './services.constants';

const createService = z.object({
  body: z.object({
    serviceDescription: z.string({
      invalid_type_error: 'Service Description must be in string',
      required_error: 'Service Description is Required',
    }),
    serviceLocation: z.string({
      invalid_type_error: 'Service Location must be in string',
      required_error: 'Service Location is Required',
    }),
    serviceCancellationPolicy: z.string({
      invalid_type_error: 'Service Cancellation Policy must be in String',
      required_error: 'Service Cancellation Policy is Required',
    }),
    servicePriceRange: z.string({
      invalid_type_error: 'Service Price Range must be in String',
      required_error: 'Service Price Range is Required',
    }),
    serviceAvailability: z.enum(
      [...ZodServiceAvailability] as [string, ...string[]],
      {
        invalid_type_error: 'Service Availability must be String',
        required_error: 'Service Availability is Required',
      }
    ),
    serviceType: z.enum([...ZodServiceType] as [string, ...string[]], {
      invalid_type_error: 'Service Types must be String',
      required_error: 'Service Types is Required',
    }),
  }),
});
const updateProperty = z.object({
  numOfBed: z
    .number({
      invalid_type_error: 'Number of Bed must be in Integer',
    })
    .optional(),
  numOfBath: z
    .number({
      invalid_type_error: 'Number of Bath must be in Integer',
    })
    .optional(),
  address: z
    .string({
      invalid_type_error: 'Address must be in String',
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: 'Description must be in String',
    })
    .optional(),
  maintenanceCoveredTenant: z
    .string({
      invalid_type_error: 'Maintenance Covered Tenant must be in String',
    })
    .optional(),
  maintenanceCoveredOwner: z
    .string({
      invalid_type_error: 'Maintenance Covered Owner must be in String',
    })
    .optional(),
  schools: z
    .string({
      invalid_type_error: 'Schools must be in String',
    })
    .optional(),
  universities: z
    .string({
      invalid_type_error: 'Universities must be in String',
    })
    .optional(),
  allowedPets: z
    .string({
      invalid_type_error: 'Allowed Pets must be in String',
    })
    .optional(),
});

export const ServicesValidation = {
  createService,
  updateProperty,
};
