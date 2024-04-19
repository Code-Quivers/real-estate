import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IRequestUser } from "../../interfaces/global.interfaces";
import { PaymentServices } from "../payment/payment.services";

import prisma from "../../../shared/prisma";
import { errorLogger, logger } from "../../../shared/logger";
import { OrderServices } from "../orders/orders.service";
import { StripeServices } from "./stripe.services";
import StripeAccountManager from "./services/AccountCreationService";

/**
 * Controller handling PayPal related operations such as creating and capturing orders.
 */
class StripeController {
  private static orderCreationSuccessMessage = "Order creation successful!!!";
  private static orderCreationFailedMessage = "Order creation failed!!!";

  /**
   * Handles payment for an order.
   */
  static createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
    console.log("Order API hit..............");

    const paymentInfo = req.body;
    const { jsonResponse, httpStatusCode } = await StripeServices.createPaymentIntent(paymentInfo);

    sendResponse(res, {
      statusCode: httpStatusCode,
      success: httpStatusCode === 201 ? true : false,
      message:
        httpStatusCode === 201
          ? StripeController.orderCreationSuccessMessage
          : StripeController.orderCreationFailedMessage,
      data: jsonResponse,
    });
  });

  static retriveStripePaymentInformation = catchAsync(async (req: Request, res: Response) => {
    const { orderId, paymentIntentId } = req.body;
    const userId = (req.user as IRequestUser).userId;
    const profileId = (req.user as IRequestUser).profileId;
    const tenantId: string = req.body?.tenantId || "";
    const propertyId: string = req.body?.propertyId || "";

    const { jsonResponse, httpStatusCode } = await StripeServices.retriveStripePaymentInfo(paymentIntentId);
    const paymentReport = StripeController.generatePaymentReport(jsonResponse, orderId, userId);

    // Create payment report in the database
    const result = await PaymentServices.createPaymnentReport(paymentReport);

    const dataToUpdate = { orderId, orderStatus: "CONFIRMED", planType: "PREMIUM" };

    const updatedOrderData = OrderServices.updateOrderStatusAndPropertyPlanType(dataToUpdate);

    sendResponse(res, {
      statusCode: httpStatusCode,
      success: httpStatusCode === 200 ? true : false,
      message: "Payment information successfully retrived!!!",
      data: jsonResponse,
    });
  });

  /**
   * Retrieves or creates an order ID for a new order.
   */
  private static getOrderIdByCreateNewOrder = async (
    orderId: string,
    profileId: string,
    tenantId: string,
    propertyId: string,
  ): Promise<string> => {
    if (orderId) return orderId;

    const orderInfo: any = {
      properties: [propertyId],
    };
    if (tenantId) {
      orderInfo["tenantId"] = tenantId;
    } else {
      orderInfo["ownerId"] = profileId;
    }
    const newOrderData = await OrderServices.createOrder(orderInfo);

    return newOrderData.orderId;
  };

  /**
   * Generates a payment report based on PayPal API response data.
   */
  private static generatePaymentReport(retrievedPaymentInfo: any, orderId: string, userId: string): any {
    return {
      platform: "STRIPE",
      paymentStatus: retrievedPaymentInfo.status,
      amountToPay: parseFloat(retrievedPaymentInfo.amount),
      amountPaid: parseFloat(retrievedPaymentInfo.amount_received),
      currency: retrievedPaymentInfo.currency,
      platformFee: parseFloat("0.0"),
      netAmount: parseFloat("0.0"),
      paymentPlatformId: retrievedPaymentInfo.id,
      transactionCreatedTime: new Date(retrievedPaymentInfo.created).toISOString(),
      orderId,
      userId,
    };
  }

  static createConnectedAccount = catchAsync(async (req: Request, res: Response) => {
    console.log("createConnectedAccount API hit..............");
    const userId: string = (req.user as IRequestUser).userId || "";
    const ownerId: string = (req.user as IRequestUser).profileId || "";

    const accountInfo = {
      ...req?.body,
      userId,
      ownerId
    }
    const { jsonResponse, httpStatusCode } = await StripeAccountManager.createConnectedAccount(accountInfo)

    sendResponse(res, {
      statusCode: httpStatusCode,
      success: httpStatusCode === 201 ? true : false,
      message:
        httpStatusCode === 201
          ? StripeController.orderCreationSuccessMessage
          : StripeController.orderCreationFailedMessage,
      data: jsonResponse,
    });
  });

  static createAccountLink = catchAsync(async (req: Request, res: Response) => {
    console.log("createAccountLink API hit..............");
    const userId = (req.user as IRequestUser).userId;
    const profileId = (req.user as IRequestUser).profileId;

    const { sConnectedAccountId } = req.body;
    const { jsonResponse, httpStatusCode } = await StripeAccountManager.createAccountLink(sConnectedAccountId);

    sendResponse(res, {
      statusCode: httpStatusCode,
      success: httpStatusCode === 201 ? true : false,
      message:
        httpStatusCode === 201
          ? StripeController.orderCreationSuccessMessage
          : StripeController.orderCreationFailedMessage,
      data: jsonResponse,
    });
  });
}



export default StripeController;
