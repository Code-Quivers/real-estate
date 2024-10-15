export type IPaymentFilterRequest = {
  searchTerm?: string | undefined;
};
export type OrderWithPaymentInfo = {
  orderId: string;
  orderStatus: string;
  paymentPlatformId: string;
  finOrgAccountId: string | undefined;
  tenant: {
    tenantId: string;
    firstName: string;
    lastName: string;
    user: {
      email: string;
    } | null;
  } | null; // Allow tenant to be null
  amount_received: number;
  properties: IPropertyDataForUpdate[];
};

type IPropertyDataForUpdate = {
  propertyId: string;
  pendingPaidTo: Date | null; // Make sure this matches the actual type
};
