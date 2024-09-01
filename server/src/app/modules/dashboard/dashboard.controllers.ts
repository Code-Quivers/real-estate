import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { DashboardDataServices } from "./dashboard.service";

//! get saved items
const getDashboardData = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardDataServices.getDashboardData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dashboard data Retrieved Successful",
    data: result,
  });
});

export const DashboardDataControllers = {
  getDashboardData,
};
