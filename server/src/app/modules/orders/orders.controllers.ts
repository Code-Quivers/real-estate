import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OrderServices } from "./orders.service";
//
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params?.orderId as string;

  const result = await OrderServices.getSingleOrder(orderId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saved item successfully removed!!!",
    data: result,
  });
});
//
const updatePropertyTrialPeriod = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params?.orderId as string;

  const result = await OrderServices.updatePropertyTrialPeriod(orderId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result?.count} Properties Activated to 30-day trial period`,
    data: result,
  });
});

const updateOrderInfo = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params?.orderId as string;
  const orderInfo = req?.body;
  const result = await OrderServices.updateOrderInfo(orderId, orderInfo);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Order information successfully updated!`,
    data: result,
  });
});

const updateOrderStatusAndPropertyPlanType = catchAsync(async (req: Request, res: Response) => {
  const { orderStatus, planType, orderId } = req?.body;
  const result = await OrderServices.updateOrderStatusAndPropertyPlanType(orderId, orderStatus, planType);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Order information successfully updated!`,
    data: result,
  });
});

export const OrdersController = {
  getSingleOrder,
  updatePropertyTrialPeriod,
  updateOrderInfo,
  updateOrderStatusAndPropertyPlanType
};
