/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import PropertyOwnerPaymentProcessor from "./payer.propertyOwner.services";
import sendResponse from "../../../../shared/sendResponse";
import { IRequestUser } from "../../../interfaces/global.interfaces";
import { PaymentServices } from "../../payment/payment.services";
import { OrderServices } from "../../orders/orders.service";
import StripeAccountManager from "./AccountCreationService";

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
    const { amountToPaid, orderId, packageType } = req.body;
    const { jsonResponse, httpStatusCode } = await PropertyOwnerPaymentProcessor.createPaymentIntent(amountToPaid);
    await OrderServices.updateOrderInfo(orderId, { packageType });
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

  static retrieveStripePaymentInformation = catchAsync(async (req: Request, res: Response) => {
    const { orderId, paymentIntentId } = req.body;
    const userId = (req.user as IRequestUser).userId;

    const { jsonResponse, httpStatusCode } =
      await PropertyOwnerPaymentProcessor.retrieveStripePaymentInfo(paymentIntentId);
    const paymentReport = StripeController.generatePaymentReport(jsonResponse, orderId, userId);

    // Create payment report in the database
    const paymentRes = await PaymentServices.createPaymentReport(paymentReport);

    await OrderServices.updateOrderStatusAndPropertyPlanType(orderId);

    sendResponse(res, {
      statusCode: httpStatusCode,
      success: httpStatusCode === 200 ? true : false,
      message: "Payment information successfully retrieved!!!",
      data: paymentRes,
    });
  });

  /**
   * Generates a payment report based on PayPal API response data.
   */
  private static generatePaymentReport(retrievedPaymentInfo: any, orderId: string, userId: string): any {
    return {
      platform: "STRIPE",
      paymentStatus: retrievedPaymentInfo.status,
      amountToPay: parseFloat(retrievedPaymentInfo.amount) / 100.0,
      amountPaid: parseFloat(retrievedPaymentInfo.amount_received) / 100.0,
      currency: retrievedPaymentInfo.currency,
      platformFee: retrievedPaymentInfo.metadata?.charge
        ? Math.round(parseFloat(retrievedPaymentInfo.metadata.charge) * 100) / 100
        : 0.0,
      netAmount: retrievedPaymentInfo.metadata?.netAmount ? parseFloat(retrievedPaymentInfo.metadata.netAmount) : 0.0,
      paymentPlatformId: retrievedPaymentInfo.id,
      transactionCreatedTime: new Date(retrievedPaymentInfo.created * 1000).toISOString(),
      orderId,
      userId,
    };
  }

  static createConnectedAccount = catchAsync(async (req: Request, res: Response) => {
    const userId: string = (req.user as IRequestUser).userId || "";
    const ownerId: string = (req.user as IRequestUser).profileId || "";

    const accountInfo = {
      ...req?.body,
      userId,
      ownerId,
    };
    const { jsonResponse, httpStatusCode } = await StripeAccountManager.createConnectedAccount(accountInfo);

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

  //  getting new payment information
}

export default StripeController;
