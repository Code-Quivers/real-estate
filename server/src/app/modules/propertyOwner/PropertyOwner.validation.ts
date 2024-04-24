import { z } from "zod";

const updatePropertyOwner = z.object({
  firstName: z
    .string({
      invalid_type_error: "First Name must be in String",
    })
    .optional(),
  lastName: z
    .string({
      invalid_type_error: "Last Name must be in String",
    })
    .optional(),
  phoneNumber: z
    .string({
      invalid_type_error: "Phone Number must be in String",
    })
    .optional(),
  password: z
    .string({
      invalid_type_error: "Password must be in String",
    })
    .optional(),
});

// update
const updateExtraCost = z.object({
  body: z.object({
    cost: z.number().nonnegative(),
  }),
});

export const PropertyOwnerValidation = {
  updatePropertyOwner,
  updateExtraCost,
};
