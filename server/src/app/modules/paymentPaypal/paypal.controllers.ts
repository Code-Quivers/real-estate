import { Request, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PaypalServices } from './paypal.services';
import { IRequestUser } from "../../interfaces/global.interfaces";
import { PaymentServices } from '../payment/payment.services';

import prisma from '../../../shared/prisma';
import { errorLogger, logger } from '../../../shared/logger';


class PaypalController {
  private static orderCreationSuccessMessage = 'Order creation successful!!!';
  private static orderCreationFailedMessage = 'Order creation failed!!!';

  static payForOrder = catchAsync(async (req: Request, res: Response) => {
    console.log('Order API hit..............');
    console.log(req.body)
    const paymentInfo = req.body;
    const { jsonResponse, httpStatusCode } = await PaypalServices.createOrder(paymentInfo);
    // PaypalController.sendPaymentResponse(res, httpStatusCode, jsonResponse);
    console.log(jsonResponse)

    sendResponse(res, {
      statusCode: httpStatusCode,
      success: httpStatusCode === 201 ? true : false,
      message: httpStatusCode === 201 ? PaypalController.orderCreationSuccessMessage : PaypalController.orderCreationFailedMessage,
      data: jsonResponse
    });
  });

  static paymentCapture = catchAsync(async (req: Request, res: Response) => {
    console.log('Order capture with ID.............');
    const paypalOrderId = req.body?.paypalOrderId;
    const orderId = req.body?.orderId;
    const userId = (req.user as IRequestUser).userId;

    const { jsonResponse, httpStatusCode } = await PaypalServices.captureOrder(paypalOrderId);
    const capturedPaymentInfo = jsonResponse.purchase_units[0].payments.captures[0];
    const paymentReport = PaypalController.generatePaymentReport(jsonResponse, capturedPaymentInfo, orderId, userId);

    console.log(paymentReport);

    // const result = await PaymentServices.createPaymnentReport(paymentReport);

    if (!paymentReport) {
      errorLogger.error('Failed to add payment information');
    }

    sendResponse(res, {
      statusCode: httpStatusCode,
      success: true,
      message: 'Payment capture successful!!!',
      data: paymentReport,
    });
  });

  private static sendPaymentResponse(res: Response, statusCode: number, data: any) {
    sendResponse(res, {
      statusCode: statusCode,
      success: true,
      message: 'Payment capture successful!!!',
      data: data,
    });
  }

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
      platformTransactionId: capturedPaymentInfo.id,
      platformOrderId: jsonResponse.id,
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
