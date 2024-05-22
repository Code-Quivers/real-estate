export type ITenantUpdateRequest = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  oldProfileImagePath?: string;
  profileImage?: string;
  dateOfBirth?: string;
  presentAddress?: string;
  socialSecurityNumber?: string;
  placeToRent?: string;
  isCriminalRecord?: boolean;
  criminalRecordDescription?: string;
  // income information
  CurrentEmployerOrBusinessName?: string;
  CurrentEmployerOrBusinessContactInfo?: string;
  JobTitle?: string;
  AnnualSalary?: number;
  OtherIncomeSource?: string;
  CurrentCreditScore?: number;
  // other information
  isSmoker?: boolean;
  allergies?: string;
  isHaveOtherMember?: boolean;
  numberOfMember?: number;
  isWillingToSignLeasingAgreement?: boolean;
  isAnyExtraToMention?: string;
  // pets
  isPets?: boolean;
  typeOfPets?: string;
  isPetVaccinated?: boolean;
  // rental history
  prevLandlordName?: string;
  prevLandlordContactInfo?: string;
  lengthOfPrevTenancy?: string;
  affordableRentAmount?: number;
  leavingReason?: string;
  isAnyLatePaymentReason?: string;
  // account information
  password?: string;
  userName?: string;
};

export type ITenantsFilterRequest = {
  searchTerm?: string | undefined;
  tenantId?: string | undefined;
  createdAt?: string | undefined;
};
