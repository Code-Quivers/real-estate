export const ordersFilterableFields: string[] = [
  'searchTerm',
  'factoryId',
  'portId',
  'startDate',
  'endDate',
  'friStartDate',
  'friEndDate',
];
export const ordersSearchableFields: string[] = ['styleNo', 'orderNo'];

export const ordersRelationalFields: string[] = ['factoryId'];
export const ordersFactoryRelationalFields: string[] = ['style'];
export const ordersRelationalFieldsMapper: { [key: string]: string } = {
  profileId: 'profile',
  factoryId: 'factory',
};
export const ordersRelationalFieldsMapperPort: { [key: string]: string } = {
  portId: 'Port',
};

export const styleWiseOrdersSearchableFields: string[] = ['orders'];
