import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { TenantServices } from "./orderRequest.service";
import { IUserProfileResponse } from "../auth/auth.interface";

// ! get all available  tenants
const getMyRequestedOrder = catchAsync(async (req: Request, res: Response) => {
  const serviceProviderId = (req.user as IUserProfileResponse).profileId;
  const result = await TenantServices.getMyRequestedOrder(serviceProviderId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "fetching successful",
    data: result,
  });
});

export const OrderRequestControllers = {
  getMyRequestedOrder,
};
