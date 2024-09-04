export type IPaymentFilterRequest = {
  searchTerm?: string | undefined;
};
export type OrderWithPaymentInfo = {
  orderId: string;
  orderStatus: string;
  paymentPlatformId: string;
};
