export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_BASE_URL;
};
export const getAuthKey = () => {
  return process.env.NEXT_PUBLIC_API_AUTH_KEY;
};

export const fileUrlKey = () => {
  return process.env.NEXT_PUBLIC_FILE_URL_KEY;
};

// ! for payment
export const paymentClientId = () => {
  return process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
};
export const paymentEnableFunding = () => {
  return process.env.NEXT_PUBLIC_ENABLE_FUNDING;
};
export const paymentDataSdk = () => {
  return process.env.NEXT_PUBLIC_DATA_SDK_INTEGRATION_SOURCE;
};
export const paymentCurrency = () => {
  return process.env.NEXT_PUBLIC_PAYMENT_CURRENCY;
};