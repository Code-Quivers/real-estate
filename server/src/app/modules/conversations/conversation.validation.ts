import { z } from "zod";
import { ZodServiceAvailability, ZodServiceType } from "./conversation.constants";

const createOrUpdateService = z.object({
  body: z.object({
    serviceDescription: z
      .string({
        invalid_type_error: "Service Description must be in string",
      })
      .optional(),
    serviceLocation: z
      .string({
        invalid_type_error: "Service Location must be in string",
      })
      .optional(),
    serviceCancellationPolicy: z
      .string({
        invalid_type_error: "Service Cancellation Policy must be in String",
      })
      .optional(),
    minPrice: z
      .number({
        invalid_type_error: "Min Price must be in Integer",
      })
      .optional(),
    maxPrice: z
      .number({
        invalid_type_error: "Max Price must be in Integer",
      })
      .optional(),
    serviceAvailability: z
      .enum([...ZodServiceAvailability] as [string, ...string[]], {
        invalid_type_error: "Service Availability must be String",
      })
      .optional(),
    serviceType: z
      .enum([...ZodServiceType] as [string, ...string[]], {
        invalid_type_error: "Service Types must be String",
      })
      .optional(),
  }),
});

export const ServicesValidation = {
  createOrUpdateService,
};
