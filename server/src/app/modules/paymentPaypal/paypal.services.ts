/* eslint-disable @typescript-eslint/no-explicit-any */
import paypal from 'paypal-rest-sdk';
import config from '../../../config';
import { generateAccessTokenForPaypal } from './utils';
import ApiError from '../../../errors/ApiError';

paypal.configure({
  mode: config.paypalMode as string, //sandbox or live
  client_id: config.paypalClientId as string,
  client_secret: config.paypalClientSecret as string,
});


const createOrder = async (paymentInfo: any) => {
  // use the cart information passed from the front-end to calculate the purchase unit details
  // console.log('shopping cart information passed from the frontend createOrder() callback:', paymentInfo);

  const accessToken = await generateAccessTokenForPaypal(
    config.paypalBaseUrl as string,
    config.paypalClientId as string,
    config.paypalClientSecret as string
  );
  const url = `${config.paypalBaseUrl}/v2/checkout/orders`;
  const payload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        // reference_id: 'd9f80740-38f0-11e8-b467-0ed5f89f718b',
        amount: {
          currency_code: 'USD',
          value: (Math.ceil(paymentInfo?.amount * 100) / 100).toFixed(2),
        },
      },
    ],
  };

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  });

  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new ApiError(response.status, errorMessage);
  }
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderId: string) => {
  const accessToken = await generateAccessTokenForPaypal(
    config.paypalBaseUrl as string,
    config.paypalClientId as string,
    config.paypalClientSecret as string
  );
  const url = `${config.paypalBaseUrl}/v2/checkout/orders/${orderId}/capture`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    console.log('error message from captureOrder() callback:', errorMessage);
    throw new ApiError(response.status, 'Failed to capture order!!!');
  }
};

export const PaypalServices = {
  createOrder,
  captureOrder,
};
