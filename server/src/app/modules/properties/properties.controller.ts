import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { PropertiesService } from "./properties.service";
import pick from "../../../shared/pick";
import { propertiesFilterableFields } from "./properties.constants";
import { IRequestUser } from "../../interfaces/global.interfaces";

const createNewProperty = catchAsync(async (req: Request, res: Response) => {
  const profileId = (req.user as IRequestUser).profileId;

  const result = await PropertiesService.createNewProperty(profileId, req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Property created Successfully",
    data: result,
  });
});

//! get all properties =------------
const getAllProperty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, propertiesFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await PropertiesService.getAllProperty(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Properties Successfully fetched!!!",
    meta: result.meta,
    data: result.data,
  });
});
// ! -get property owner my all properties
const getPropertyOwnerAllProperty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, propertiesFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const profileId = (req.user as IRequestUser).profileId;

  const result = await PropertiesService.getPropertyOwnerAllProperty(profileId, filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Properties Successfully fetched!!!",
    meta: result.meta,
    data: result.data,
  });
});

//! get single property info
const getSinglePropertyInfo = catchAsync(async (req: Request, res: Response) => {
  const propertyId = req.params?.propertyId;

  const result = await PropertiesService.getSinglePropertyInfo(propertyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Properties successfully fetched!!!",
    data: result,
  });
});
// ! update property info

const updatePropertyInfo = catchAsync(async (req: Request, res: Response) => {
  const propertyId = req.params?.propertyId;
  const result = await PropertiesService.updatePropertyInfo(propertyId, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Property Updated Successfully",
    data: result,
  });
});

// ! assign tenant user to property or unit -----------------

const assignTenantToProperty = catchAsync(async (req: Request, res: Response) => {
  const profileId = (req.user as IRequestUser).profileId;

  const result = await PropertiesService.assignTenantToProperty(profileId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Tenant Assigned Successfully",
    data: result,
  });
});

// ! remove  tenant user from property or unit -----------------
const removeTenantFromProperty = catchAsync(async (req: Request, res: Response) => {
  const profileId = (req.user as IRequestUser).profileId;

  const result = await PropertiesService.removeTenantFromProperty(profileId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Tenant remove Successfully",
    data: result,
  });
});

// ! assign Service Provider to property or unit

const assignServiceProviderToProperty = catchAsync(async (req: Request, res: Response) => {
  const profileId = (req.user as IRequestUser).profileId;

  const result = await PropertiesService.assignServiceProviderToProperty(profileId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Service Provider Assigned Successfully",
    data: result,
  });
});

export const PropertiesController = {
  createNewProperty,
  getAllProperty,
  getSinglePropertyInfo,
  updatePropertyInfo,
  getPropertyOwnerAllProperty,
  assignTenantToProperty,
  assignServiceProviderToProperty,
  removeTenantFromProperty,
};
