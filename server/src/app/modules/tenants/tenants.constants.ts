export const tenantsFilterableFields: string[] = ["propertyOwnerId", "searchTerm", "presentAddress"];

export const tenantsSearchableFields: string[] = ["firstName", "lastName", "phoneNumber"];

export const tenantsRelationalFields: string[] = ["user"];
export const tenantsRelationalFieldsMapper: { [key: string]: string } = {
  userId: "userId",
};
