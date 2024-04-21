export const PaymentFilterableFields: string[] = ['searchTerm'];
export const PaymentSearchableFields: string[] = ['platformTransactionId', 'platformOrderId', 'payerEmailAddress'];

export const PaymentRelationalFields: string[] = ['productName'];

export const PaymentRelationalFieldsMapper: { [key: string]: string } = {
  assetName: 'productName',
};
