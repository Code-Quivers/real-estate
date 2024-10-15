/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { PaymentServices } from "../../payment/payment.services";
import TenantPaymentProcessor from "./payer.tenant.services";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { IRequestUser } from "../../../interfaces/global.interfaces";

/**
 * Controller handling PayPal related operations such as creating and capturing orders.
 */
class PayerTenantController {
  private static orderCreationSuccessMessage = "Order creation successful!!!";
  private static orderCreationFailedMessage = "Order creation failed!!!";

  /**
   * Handles payment for an order.
   */
  static createTenantPaymentIntent = catchAsync(async (req: Request, res: Response) => {
    const { jsonResponse, httpStatusCode } = await TenantPaymentProcessor.createPaymentIntentForTenant(req.body);
    sendResponse(res, {
      statusCode: httpStatusCode,
      success: httpStatusCode === 201 ? true : false,
      message: httpStatusCode === 201 ? this.orderCreationSuccessMessage : this.orderCreationFailedMessage,
      data: jsonResponse,
    });
  });

  static retrieveTenantPaymentInformation = catchAsync(async (req: Request, res: Response) => {
    const { orderId, paymentIntentId, connectedAccountId } = req.body;
    const userId = (req.user as IRequestUser).userId;

    const { jsonResponse, httpStatusCode } = await TenantPaymentProcessor.retrievePaymentInfo(
      paymentIntentId,
      connectedAccountId,
    );

    const paymentReport = this.generatePaymentReport(jsonResponse, orderId, userId);

    // Create payment report in the database
    const paymentRes = await PaymentServices.createPaymentReport(paymentReport);

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
    // Amount divided by 100 cause stripe calculate amount in the cent.

    return {
      platform: "STRIPE",
      paymentStatus: retrievedPaymentInfo.status,
      amountToPay: parseFloat(retrievedPaymentInfo.amount) / 100.0,
      amountPaid: parseFloat(retrievedPaymentInfo.amount_received) / 100.0,
      currency: retrievedPaymentInfo.currency,
      platformFee: Math.round(parseFloat(retrievedPaymentInfo.metadata.charge) * 100) / 100,
      netAmount: parseFloat(retrievedPaymentInfo.metadata.netAmount),
      paymentPlatformId: retrievedPaymentInfo.id,
      transactionCreatedTime: new Date(retrievedPaymentInfo.created * 1000).toISOString(),
      orderId,
      userId,
    };
  }
}

export default PayerTenantController;
