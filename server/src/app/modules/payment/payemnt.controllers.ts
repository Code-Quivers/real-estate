import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { PaymentServices } from "./payment.services";

import { PaymentFilterableFields } from "./payment.constant";
import pick from "../../../shared/pick";
import { IRequestUser } from "../../interfaces/global.interfaces";

// const getPaymentReports = catchAsync(async (req, res) => {
//   //   const paymentInfo = req.body;
//   const result = await PaymentServices.getPaymentReports();

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Payment reports fetching successful!!!',
//     data: result,
//   });
// });

const getPaymentReports = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, PaymentFilterableFields);

  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await PaymentServices.getPaymentReports(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Payment fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getPaymentReport = catchAsync(async (req, res) => {
  const { paymentId } = req.params;
  const paymentInfo = req.body;
  const userId = (req.user as IRequestUser).userId;
  const result = await PaymentServices.getPaymentReport(paymentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment reports fetching successful!!!",
    data: result,
  });
});

const getPaymentReportsWithOrderId = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const userId = (req.user as IRequestUser).userId;
  const result = await PaymentServices.getPaymentReportsWithOrderId(userId, orderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment reports fetching successful!!!",
    data: result,
  });
});

const getAccountFromStripe = catchAsync(async (req, res) => {
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await PaymentServices.getAccountFromStripe(options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fetching successful!!!",
    data: result,
  });
});
// deleteConnectedAccount
const deleteConnectedAccount = catchAsync(async (req, res) => {
  const accountId = req?.params?.accountId;
  const result = await PaymentServices.deleteConnectedAccount(accountId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Account Deleted !",
    data: result,
  });
});

export const PaymentController = {
  getPaymentReports,
  getPaymentReportsWithOrderId,
  getPaymentReport,
  getAccountFromStripe,
  deleteConnectedAccount,
};
