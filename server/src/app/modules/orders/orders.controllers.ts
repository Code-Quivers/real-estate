import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { SavedItemServices } from "./orders.services";

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const itemId = req.query?.itemId as string;
  const result = await SavedItemServices.getSingleOrder(itemId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saved item successfully removed!!!",
    data: result,
  });
});

export const OrdersController = {
  getSingleOrder,
};
