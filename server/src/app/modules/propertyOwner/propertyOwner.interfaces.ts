export type IPropertyOwnerUpdateRequest = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  oldProfileImagePath?: string;
  password?: string;
};

export type IPropertyOwnerFilterRequest = {
  searchTerm?: string | undefined;
  propertyOwnerId?: string | undefined;
  createdAt?: string | undefined;
};
