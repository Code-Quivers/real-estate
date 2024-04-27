import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ReportsService } from "./reports.service";
import pick from "../../../shared/pick";
import { reportsFilterableFields } from "./reports.constants";
import { IRequestUser } from "../../interfaces/global.interfaces";

// ! start new conversation
const addMonthlyOrAnnualReport = catchAsync(async (req: Request, res: Response) => {
  const propertyOwnerId = (req.user as IRequestUser).profileId;
  const result = await ReportsService.addMonthlyOrAnnualReport(propertyOwnerId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Added Successfully",
    data: result,
  });
});

// ! get property owner reports
const getPropertyOwnerReports = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, reportsFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const propertyOwnerId = (req.user as IRequestUser).profileId;
  const result = await ReportsService.getPropertyOwnerReports(filters, options, propertyOwnerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reports Retrieved Successfully",
    data: result,
  });
});
// ! get single Chat
const getSingleChat = catchAsync(async (req: Request, res: Response) => {
  //
  const conversationId = req.params?.conversationId;
  const userId = (req.user as IRequestUser).userId;
  const result = await ReportsService.getSingleChat(conversationId, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Conversations Retrieved Successfully",
    data: result,
  });
});

export const ReportsController = { addMonthlyOrAnnualReport, getPropertyOwnerReports, getSingleChat };
