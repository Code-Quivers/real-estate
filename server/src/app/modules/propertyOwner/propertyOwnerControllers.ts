import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { PropertyOwnerServices } from './propertyOwner.service';
import catchAsync from '../../../shared/catchAsync';

const UpdatePropertyOwner = catchAsync(async (req: Request, res: Response) => {
  const propertyOwnerId = req.params?.propertyOwnerId;

  const result = await PropertyOwnerServices.UpdatePropertyOwner(
    propertyOwnerId,
    req
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Property owner created or update successful!',
    data: result,
  });
});

export const PropertyOwnerControllers = {
  UpdatePropertyOwner,
};
