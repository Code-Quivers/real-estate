import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ReportsService } from "./reports.service";
import pick from "../../../shared/pick";
import { reportsFilterableFields } from "./reports.constants";
import { IRequestUser } from "../../interfaces/global.interfaces";

// ! add new report
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
// ! add new annual tax document
const addAnnualTaxDocument = catchAsync(async (req: Request, res: Response) => {
  const propertyOwnerId = (req.user as IRequestUser).profileId;
  const result = await ReportsService.addAnnualTaxDocument(propertyOwnerId, req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Added Successfully",
    data: result,
  });
});
// ! generateTenantInfoReport
const generateTenantInfoReport = catchAsync(async (req: Request, res: Response) => {
  const propertyOwnerId = (req.user as IRequestUser).profileId;
  const result = await ReportsService.generateTenantInfoReport(propertyOwnerId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Generated Successfully",
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
const getReportDetails = catchAsync(async (req: Request, res: Response) => {
  //
  const reportId = req.params.reportId;
  const propertyOwnerId = (req.user as IRequestUser).profileId;
  const result = await ReportsService.getReportDetails(reportId, propertyOwnerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Report Details Retrieved Successfully",
    data: result,
  });
});
// ! update report details
const updateReportData = catchAsync(async (req: Request, res: Response) => {
  //
  const reportId = req.params.reportId;
  const propertyOwnerId = (req.user as IRequestUser).profileId;
  const result = await ReportsService.updateReportData(reportId, propertyOwnerId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully Updated",
    data: result,
  });
});

export const ReportsController = {
  addMonthlyOrAnnualReport,
  addAnnualTaxDocument,
  generateTenantInfoReport,
  getPropertyOwnerReports,
  getReportDetails,
  updateReportData,
};
