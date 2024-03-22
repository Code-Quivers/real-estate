import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IRequestUser } from "../../interfaces/global.interfaces";
import { RequestMaintenanceService } from "./maintenanceRequest.service";

// ! add request maintenance request to property owner from tenant user
const addRequestMaintenanceToPropertyOwner = catchAsync(async (req: Request, res: Response) => {
  const tenantId = (req.user as IRequestUser).profileId;

  const result = await RequestMaintenanceService.addRequestMaintenanceToPropertyOwner(tenantId, req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Maintenance request added successful",
    data: result,
  });
});
// ! get my(tenant) requested maintenances

const getMyRequestedMaintenance = catchAsync(async (req: Request, res: Response) => {
  const tenantId = (req.user as IRequestUser).profileId;

  const result = await RequestMaintenanceService.getMyRequestedMaintenance(tenantId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My Requested Maintenance retrieved successful",
    data: result,
  });
});
// ! get all  requested maintenances for property owner

const getRequestedMaintenanceForPropertyOwner = catchAsync(async (req: Request, res: Response) => {
  const propertyOwnerId = (req.user as IRequestUser).profileId;

  const result = await RequestMaintenanceService.getRequestedMaintenanceForPropertyOwner(propertyOwnerId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My Requested Maintenance retrieved successful",
    data: result,
  });
});
// ! get all  requested maintenances for Service Providers

const getRequestedMaintenanceForServiceProvider = catchAsync(async (req: Request, res: Response) => {
  const serviceProviderId = (req.user as IRequestUser).profileId;

  const result = await RequestMaintenanceService.getRequestedMaintenanceForServiceProvider(serviceProviderId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Requested Maintenance retrieved successful",
    data: result,
  });
});
// -0------------------------------------------------------------------------------------------
// ! accept request and send to service providers
const acceptRequestMaintenanceForOwner = catchAsync(async (req: Request, res: Response) => {
  const propertyOwnerId = (req.user as IRequestUser).profileId;
  const maintenanceRequestId = req.params?.maintenanceRequestId;

  const result = await RequestMaintenanceService.acceptRequestMaintenanceForOwner(
    maintenanceRequestId,
    propertyOwnerId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Maintenance request Approved successful",
    data: result,
  });
});

export const MaintenanceRequestControllers = {
  addRequestMaintenanceToPropertyOwner,
  getMyRequestedMaintenance,
  getRequestedMaintenanceForPropertyOwner,
  acceptRequestMaintenanceForOwner,
  getRequestedMaintenanceForServiceProvider,
};
