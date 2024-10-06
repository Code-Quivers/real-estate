export type IPaymentFilterRequest = {
  searchTerm?: string | undefined;
};
export type OrderWithPaymentInfo = {
  orderId: string;
  orderStatus: string;
  paymentPlatformId: string;
  finOrgAccountId: string;
  properties: IPropertyDataForUpdate[];
};

type IPropertyDataForUpdate = {
  propertyId: string;
  pendingPaidTo: string;
};
