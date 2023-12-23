import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IRequestUser } from '../users/user.interface';
import { PropertiesService } from './properties.service';

const createNewProperty = catchAsync(async (req: Request, res: Response) => {
  //
  const profileId = (req.user as IRequestUser).profileId;

  const result = await PropertiesService.createNewProperty(profileId, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Property created Successfully',
    data: result,
  });
});
//! =------------
const getAllProperty = async (req: Request, res: Response) => {
  const result = await PropertiesService.getAllProperty();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Properties successfully fetched!!!',
    data: result,
  });
};
const getSinglePropertyInfo = async (req: Request, res: Response) => {
  const propertyId = req.params?.propertyId;

  const result = await PropertiesService.getSinglePropertyInfo(propertyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Properties successfully fetched!!!',
    data: result,
  });
};
export const PropertiesController = {
  createNewProperty,
  getAllProperty,
  getSinglePropertyInfo,
};
