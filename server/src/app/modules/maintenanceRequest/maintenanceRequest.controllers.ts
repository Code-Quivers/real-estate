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

export const MaintenanceRequestControllers = { addRequestMaintenanceToPropertyOwner };
