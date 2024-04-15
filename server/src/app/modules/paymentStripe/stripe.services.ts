/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from "stripe";

import paypal from "paypal-rest-sdk";
import config from "../../../config";
import { generateAccessTokenForPaypal } from "./utils";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import httpStatus from "http-status";

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
        ownerId: ownerId,
      },
      select: {
        owner: {
          select: {
            paypalBussinessEmail: true,
            paypalMerchentId: true,
          },
        },
      },
    });

    // Throw error if owner information is not found
    if (!ownerInfo) throw new ApiError(httpStatus.BAD_REQUEST, "Failed to fetch merchant information");

    return ownerInfo.owner;
  });

  return result;
};

/**
 * Creates a PayPal order for processing payment.
 */

// This is your test secret API key.
const stripe = new Stripe(
  "sk_test_51P3kzDBMbxBFdGafgJOAyh9RAFzMyuqWwQgLV3c9lQRRM9mMNxeIwA8JRVyQSsvDblTKrLTTjFjZVhOyEwiFLKHm00OZivN3dg",
);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

const createPaymentIntent = async (paymentInfo: any) => {
  const { items } = paymentInfo;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  if (!paymentIntent?.client_secret) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to get client secret from Stripe!!!");
  }
  // res.send({
  //   clientSecret: paymentIntent.client_secret,
  // });
  console.log(paymentIntent);
  console.log("----------------------------");
  return {
    jsonResponse: { clientSecret: paymentIntent.client_secret },
    httpStatusCode: 201,
  };
};

const retriveStripePaymentInfo = async (paymentIntentId: string) => {
  const paymentIntentInfo = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (!paymentIntentInfo) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Payment information retrivation failed!!!");
  }
  return {
    jsonResponse: paymentIntentInfo,
    httpStatusCode: 200,
  };
};

const createConnectedAccount = async (paymentInfo: any, profileId: string) => {
  const newAccount = await stripe.accounts.create({
    type: 'standard',
    business_type:'individual',
    // email: 'jenny.rosen@example.com',
    // capabilities: {
    //   card_payments: {
    //     requested: true,
    //   },
    //   transfers: {
    //     requested: true,
    //   },
    // },
    // tos_acceptance: {
    //   service_agreement: 'recipient',
    // },
  });

  if (!newAccount) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Payment information retrivation failed!!!");
  }
  console.log(newAccount, 'new Account created!!!!!!!!!!!!')
  const updatedData = await prisma.propertyOwner.update({
    where: {
      propertyOwnerId: profileId
    },
    data: {
      sConnectedAccount: newAccount.id
    }
  })

  const accountLink = await stripe.accountLinks.create({
    account: newAccount.id,
    refresh_url: 'http://localhost:3000/property-owner/settings',
    return_url: 'http://localhost:3000/property-owner/settings',
    type: 'account_onboarding',
  });

  return {
    jsonResponse: accountLink,
    httpStatusCode: 200,
  };
};


const createAccountLink = async (sConnectedAccount: any, profileId: string) => {

  // const connectedAccountData = await prisma.propertyOwner.findUnique({
  //   where: {
  //     propertyOwnerId: profileId
  //   },
  //   select: {
  //     sConnectedAccount: true
  //   }
  // })
  // if (!connectedAccountData) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, "Failed to fetch connected account data!!!")
  // }
  const accountLink = await stripe.accountLinks.create({
    account: sConnectedAccount,
    refresh_url: 'http://localhost:3000/property-owner/settings',
    return_url: 'http://localhost:3000/property-owner/settings',
    type: 'account_onboarding',
  });

  return {
    jsonResponse: accountLink,
    httpStatusCode: 200,
  };
};
export const StripeServices = {
  createPaymentIntent,
  retriveStripePaymentInfo,
  createConnectedAccount,
  createAccountLink,
};
