/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from "stripe";
import ApiError from "../../../../errors/ApiError";
import httpStatus from "http-status";
import prisma from "../../../../shared/prisma";
import { OrderServices } from "../../orders/orders.service";

const stripe = new Stripe(
  "sk_test_51P3kzDBMbxBFdGafgJOAyh9RAFzMyuqWwQgLV3c9lQRRM9mMNxeIwA8JRVyQSsvDblTKrLTTjFjZVhOyEwiFLKHm00OZivN3dg",
);

class TenantPaymentProcessor {
  private static intentObject = {
    amount: 0.0,
    currency: "usd",
    payment_method_types: ["card"],
  };

  private static fixAmountToTwoDecimal = (amount: number) => {
    // Multiply by 100, cause stripe receive amount in cents.
    return parseFloat((Math.ceil(amount * 100) / 100).toFixed(2)) * 100;
  };

  static createPaymentIntent = async (amount: number, connectedAccountId: string = "") => {
    try {
      const paymentIntent = await stripe.paymentIntents.create(
        {
          ...this.intentObject,
          amount: this.fixAmountToTwoDecimal(amount),
        },
        {
          stripeAccount: connectedAccountId,
        },
      );

      if (!paymentIntent?.client_secret) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Failed to get client secret from Stripe!!!");
      }

      return {
        jsonResponse: { clientSecret: paymentIntent.client_secret },
        httpStatusCode: 201,
      };
    } catch (err) {
      console.log(err);
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to get client secret from Stripe!!!");
    }
  };

  static createPaymentIntentForTenant = async (paymentInfo: any) => {
    const { tenantId, propertyId, amountToPaid, ownerId } = paymentInfo;
    const propertyInfo = await prisma.property.findUnique({
      where: {
        propertyId,
        ownerId,
        // monthlyRent: amountToPaid,
      },
      select: {
        monthlyRent: true,
        owner: {
          select: {
            FinancialAccount: {
              select: {
                finOrgAccountId: true,
              },
            },
          },
        },
      },
    });
    // const amount: number = amountToPaid || propertyInfo?.monthlyRent || 0.0;
    const amount: number = amountToPaid || 0.0;
    const connectedAccountId: string = propertyInfo?.owner?.FinancialAccount?.finOrgAccountId || "";

    if (!amount || !connectedAccountId) {
      console.log("NO Stripe account found for the property owner", amount, connectedAccountId);
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to extract related information!");
    }
    const { jsonResponse, httpStatusCode } = await this.createPaymentIntent(amount, connectedAccountId);

    // Create order for the payment which is paying by the tenant as monthly rent for the rented property.
    const orderInfo = {
      properties: [propertyId],
      tenantId: tenantId,
    };
    const orderData = await OrderServices.createOrder(orderInfo);

    return {
      jsonResponse: { ...jsonResponse, connectedAccountId: connectedAccountId, orderId: orderData?.orderId },
      httpStatusCode: httpStatusCode,
    };
    // throw new ApiError(httpStatus.BAD_REQUEST, "Failed to get secret for client!")
  };

  static retrivePaymentInfo = async (paymentIntentId: string, connectedAccountId: string) => {
    const paymentIntentInfo = await stripe.paymentIntents.retrieve(paymentIntentId, {
      stripeAccount: connectedAccountId,
    });

    if (!paymentIntentInfo) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Payment information retrivation failed!!!");
    }
    return {
      jsonResponse: paymentIntentInfo,
      httpStatusCode: 200,
    };
  };
}

export default TenantPaymentProcessor;
