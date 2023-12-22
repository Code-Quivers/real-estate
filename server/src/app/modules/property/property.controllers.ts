/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUploadFile } from '../../../interfaces/file';
import { PropertyServices } from './property.service';

const addProperty = async (req: Request, res: Response) => {
  const images: IUploadFile[] = req.files as any;
  const data = req.body?.data;
  const payload = { images, data: JSON.parse(data) };
  const result = PropertyServices.propertyAdd(payload);

  console.log(result);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Property successfully added!!!',
  });
};

const getProperties = async (req: Request, res: Response) => {
  const result = await PropertyServices.getProperties();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Properties successfully fetched!!!',
    data: result,
  });
};

const getPropertyInfo = async (req: Request, res: Response) => {
  const propertyId: string = req.query?.propertyId as string;
  const result = await PropertyServices.getPropertyInfo(propertyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Properties successfully fetched!!!',
    data: result,
  });
};

export const PropertyController = {
  addProperty,
  getProperties,
  getPropertyInfo,
};
