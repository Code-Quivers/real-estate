export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_BASE_URL;
};
export const getAuthKey = () => {
  return process.env.NEXT_PUBLIC_API_AUTH_KEY;
};

export const fileUrlKey = () => {
  return process.env.NEXT_PUBLIC_FILE_URL_KEY;
};

export const getMsgEndPoint = () => {
  return process.env.NEXT_PUBLIC_MSG_ENDPOINT;
};

export const getClientUrl = () => {
  return process.env.NEXT_PUBLIC_CLIENT_URL;
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
export const getUnitPackagePrices = () => {
  return {
    MONTHLY: process.env.NEXT_PUBLIC_MONTHLY_UNIT_PACKAGE_PRICE,
    BIANNUALLY: process.env.NEXT_PUBLIC_BIANNUALLY_PACKAGE_PRICE,
    ANNUALLY: process.env.NEXT_PUBLIC_ANNUALLY_PACKAGE_PRICE,
  };
};

export const getStripePKLive = ()=>{
  return process.env.NEXT_PUBLIC_STRIPE_PK_LIVE;
};

