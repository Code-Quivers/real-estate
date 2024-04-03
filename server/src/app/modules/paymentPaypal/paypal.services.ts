/* eslint-disable @typescript-eslint/no-explicit-any */
import paypal from 'paypal-rest-sdk';
import config from '../../../config';
import { generateAccessTokenForPaypal } from './utils';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';

paypal.configure({
  mode: config.paypalMode as string, //sandbox or live
  client_id: config.paypalClientId as string,
  client_secret: config.paypalClientSecret as string,
});

/**
 * Retrieves merchant information associated with a property and owner.
 */
const get_merchant_info = async (propertyId: any, ownerId: any): Promise<any> => {
  // Execute transaction to retrieve merchant information
  const result = await prisma.$transaction(async (transactionClient) => {
    // Checking if the owner is assigned to the specified property
    const ownerInfo = await transactionClient.property.findUnique({
      where: {
        propertyId: propertyId,
        ownerId: ownerId
      },
      select: {
        owner: {
          select: {
            paypalBussinessEmail: true,
            paypalMerchentId: true
          }
        }
      },
    });

    // Throw error if owner information is not found
    if (!ownerInfo) throw new ApiError(httpStatus.BAD_REQUEST, "Failed to fetch merchant information");

    return ownerInfo.owner;
  });

  return result;
}




/**
 * Creates a PayPal order for processing payment.
 */
const createOrder = async (paymentInfo: any) => {
  // use the cart information passed from the front-end to calculate the purchase unit details

  // Generate access token for PayPal API authentication
  const accessToken = await generateAccessTokenForPaypal(
    config.paypalBaseUrl as string,
    config.paypalClientId as string,
    config.paypalClientSecret as string
  );

  // Define the endpoint URL for creating PayPal orders
  const url = `${config.paypalBaseUrl}/v2/checkout/orders`;

  // Construct purchase unit information
  const purchaseUnitInfo: any = {
    amount: {
      currency_code: 'USD',
      value: (Math.ceil(paymentInfo?.amountToPaid * 100) / 100).toFixed(2),
    },
  }

  // If the payment is for rent, assign payee information
  if (paymentInfo?.isRentPayment) {
    const merchantInfo = await get_merchant_info(paymentInfo.propertyId, paymentInfo.ownerId)
    purchaseUnitInfo.payee = {
      email_address: merchantInfo.paypalBussinessEmail,
      merchant_id: merchantInfo.paypalMerchentId
    }
  }

  // Construct payload for creating the order
  const payload = {
    intent: 'CAPTURE',
    purchase_units: [purchaseUnitInfo],
  };

  // Make a POST request to create the order
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  });

  try {
    // Parse JSON response
    const jsonResponse = await response.json();

    // Return the response along with HTTP status code
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    // If unable to parse JSON response, handle the error
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
