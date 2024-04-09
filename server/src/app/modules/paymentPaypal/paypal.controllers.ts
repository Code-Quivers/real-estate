import { Request, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PaypalServices } from './paypal.services';
import { IRequestUser } from "../../interfaces/global.interfaces";
import { PaymentServices } from '../payment/payment.services';

import prisma from '../../../shared/prisma';
import { errorLogger, logger } from '../../../shared/logger';
import { OrderServices } from '../orders/orders.service';


/**
 * Controller handling PayPal related operations such as creating and capturing orders.
 */
class PaypalController {
  private static orderCreationSuccessMessage = 'Order creation successful!!!';
  private static orderCreationFailedMessage = 'Order creation failed!!!';

  /**
   * Handles payment for an order.
   */
  static payForOrder = catchAsync(async (req: Request, res: Response) => {
    console.log('Order API hit..............');

    const paymentInfo = req.body;
    const { jsonResponse, httpStatusCode } = await PaypalServices.createOrder(paymentInfo);

    sendResponse(res, {
      statusCode: httpStatusCode,
      success: httpStatusCode === 201 ? true : false,
      message: httpStatusCode === 201 ? PaypalController.orderCreationSuccessMessage : PaypalController.orderCreationFailedMessage,
      data: jsonResponse
    });
  });

  /**
   * Retrieves or creates an order ID for a new order.
   */
  private static getOrderIdByCreateNewOrder = async (orderId: string, profileId: string, tenantId: string, propertyId: string): Promise<string> => {
    if (orderId) return orderId;

    const orderInfo: any = {
      properties: [propertyId]
    }
    if (tenantId) {
      orderInfo['tenantId'] = tenantId;
    }
    else {
      orderInfo['ownerId'] = profileId;
    }
    const newOrderData = await OrderServices.createOrder(orderInfo);

    return newOrderData.orderId;
  }

  /**
   * Handles capturing payment for a PayPal order.
   */
  static paymentCapture = catchAsync(async (req: Request, res: Response) => {
    // Extract necessary data from the request
    const paypalOrderId = req.body?.paypalOrderId;
    let orderId: string = req.body?.orderId || "";
    const userId = (req.user as IRequestUser).userId;
    const profileId = (req.user as IRequestUser).profileId;
    const tenantId: string = req.body?.tenantId || "";
    const propertyId: string = req.body?.propertyId || "";

    // Capture payment using PayPal services
    const { jsonResponse, httpStatusCode } = await PaypalServices.captureOrder(paypalOrderId);
    const capturedPaymentInfo = jsonResponse.purchase_units[0].payments.captures[0];

    // Get or create an order ID for the payment
    orderId = await this.getOrderIdByCreateNewOrder(orderId, profileId, tenantId, propertyId);

    // Generate payment report based on PayPal API response
    const paymentReport = PaypalController.generatePaymentReport(jsonResponse, capturedPaymentInfo, orderId, userId);

    // Create payment report in the database
    const result = await PaymentServices.createPaymnentReport(paymentReport);

    // Log error if failed to add payment information
    if (!result) {
      errorLogger.error('Failed to add payment information');
    }

    // Send response back to the client
    sendResponse(res, {
      statusCode: httpStatusCode,
      success: true,
      message: 'Payment capture successful!!!',
      data: paymentReport,
    });
  });

  /**
   * Generates a payment report based on PayPal API response data.
   */
  private static generatePaymentReport(
    jsonResponse: any,
    capturedPaymentInfo: any,
    orderId: string,
    userId: string
  ): any {
    return {
      platform: 'PAYPAL',
      paymentStatus: capturedPaymentInfo.status,
      amountToPay: parseFloat(capturedPaymentInfo.amount.value),
      amountPaid: parseFloat(capturedPaymentInfo.seller_receivable_breakdown.gross_amount.value),
      currency: capturedPaymentInfo.amount.currency_code,
      platformFee: parseFloat(capturedPaymentInfo.seller_receivable_breakdown.paypal_fee.value),
      netAmount: parseFloat(capturedPaymentInfo.seller_receivable_breakdown.net_amount.value),
      paymentPlatformTransactionId: capturedPaymentInfo.id,
      paymentPlatformOrderId: jsonResponse.id,
      refundLink: capturedPaymentInfo.links[1].href,
      transactionCreatedTime: capturedPaymentInfo.create_time,
      transactionUpdatedTime: capturedPaymentInfo.update_time,
      payerName: `${jsonResponse.payer.name.given_name} ${jsonResponse.payer.name.surname}`,
      payerEmailAddress: jsonResponse.payer.email_address,
      orderId,
      userId,
    };
  }
}

export default PaypalController;
