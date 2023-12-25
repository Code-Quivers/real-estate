import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { TenantServices } from "./tenants.service";
// ! get all tenants
const getAllTenants = catchAsync(async (req: Request, res: Response) => {
  const result = await TenantServices.getTenants();

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Tenants fetching successful",
    data: result,
  });
});
// ! get single tenant
const getSingleTenant = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.params?.tenantId;
  const result = await TenantServices.getSingleTenant(tenantId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Tenant retrieved Successful",
    data: result,
  });
});
// ! update tenant profile
const updateTenantProfile = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.params?.tenantId;

  const result = await TenantServices.updateTenantProfile(tenantId, req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Property owner created or update successful!",
    data: result,
  });
});
export const TenantsControllers = {
  getAllTenants,
  updateTenantProfile,
  getSingleTenant,
};
