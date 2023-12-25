import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { TenantServices } from './tenant.services';
import catchAsync from '../../../shared/catchAsync';

const getAllTenants = catchAsync(async (req: Request, res: Response) => {
  const result = await TenantServices.getTenants();

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Tenants fetching successful',
    data: result,
  });
});

export const TenantControllers = {
  getAllTenants,
};
