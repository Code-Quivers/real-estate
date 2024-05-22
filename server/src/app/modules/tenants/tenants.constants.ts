export const tenantsFilterableFields: string[] = ["searchTerm"];

export const tenantsSearchableFields: string[] = ["firstName", "lastName", "phoneNumber", "presentAddress"];

export const tenantsRelationalFields: string[] = ["user"];
export const tenantsRelationalFieldsMapper: { [key: string]: string } = {
  userId: "userId",
};
