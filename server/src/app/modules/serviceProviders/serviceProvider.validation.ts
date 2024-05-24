import { z } from "zod";

const updateServiceProvider = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
  companyName: z.string().optional(),
  companyAddress: z.string().optional(),
  companyPhoneNumber: z.string().optional(),
  companyEmailAddress: z.string().optional(),
  password: z.string().optional(),
});

export const ServiceProviderValidation = {
  updateServiceProvider,
};
