import { z } from "zod";

const updateTenantProfile = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional().nullable(),
  dateOfBirth: z.string().optional().nullable(),
  presentAddress: z.string().optional().nullable(),
  socialSecurityNumber: z.string().optional().nullable(),
  placeToRent: z.string().optional().nullable(),
  isCriminalRecord: z.boolean().optional().nullable(),
  criminalRecordDescription: z.string().optional().nullable(),
  CurrentEmployerOrBusinessName: z.string().optional().nullable(),
  CurrentEmployerOrBusinessContactInfo: z.string().optional().nullable(),
  JobTitle: z.string().optional().nullable(),
  AnnualSalary: z.number().optional().nullable(),
  OtherIncomeSource: z.string().optional().nullable(),
  CurrentCreditScore: z.number().optional().nullable(),
  isSmoker: z.boolean().optional().nullable(),
  allergies: z.string().optional().nullable(),
  isHaveOtherMember: z.boolean().optional().nullable(),
  numberOfMember: z.number().optional().nullable(),
  isWillingToSignLeasingAgreement: z.boolean().optional().nullable(),
  isAnyExtraToMention: z.string().optional().nullable(),
  isPets: z.boolean().optional().nullable(),
  typeOfPets: z.string().optional().nullable(),
  isPetVaccinated: z.boolean().optional().nullable(),
  prevLandlordName: z.string().optional().nullable(),
  prevLandlordContactInfo: z.string().optional().nullable(),
  lengthOfPrevTenancy: z.string().optional().nullable(),
  affordableRentAmount: z.number().optional().nullable(),
  leavingReason: z.string().optional().nullable(),
  isAnyLatePaymentReason: z.string().optional().nullable(),
});

export const TenantsValidation = {
  updateTenantProfile,
};
