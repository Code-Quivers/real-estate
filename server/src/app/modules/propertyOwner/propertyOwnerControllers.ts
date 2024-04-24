import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { PropertyOwnerServices } from "./propertyOwner.service";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { propertyOwnerFilterableFields } from "./propertyOwner.constants";
import { IRequestUser } from "../../interfaces/global.interfaces";
import StripeAccountManager from "../paymentStripe/payerPropertyOwner/AccountCreationService";

// ! get all Property Owners
const getAllPropertyOwners = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, propertyOwnerFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await PropertyOwnerServices.getAllPropertyOwners(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Property Owners retrieved successful",
    data: result,
  });
});

// ! get single  property owner

const getSinglePropertyOwner = catchAsync(async (req: Request, res: Response) => {
  const propertyOwnerId = req.params?.propertyOwnerId;

  const result = await PropertyOwnerServices.getSinglePropertyOwner(propertyOwnerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Property Owner Profile Information retrieved successful!",
    data: result,
  });
});

// ! get  property owner my profile
const getPropertyOwnerMyProfile = catchAsync(async (req: Request, res: Response) => {
  const propertyOwnerId = (req.user as IRequestUser).profileId;
  const result = await PropertyOwnerServices.getSinglePropertyOwner(propertyOwnerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Property Owner my profile retrieved Successful",
    data: result,
  });
});
// ! update property owner

const UpdatePropertyOwner = catchAsync(async (req: Request, res: Response) => {
  const propertyOwnerId = req.params?.propertyOwnerId;

  const result = await PropertyOwnerServices.UpdatePropertyOwner(propertyOwnerId, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Property owner  updated successful!",
    data: result,
  });
});

const getFinancialAccount = catchAsync(async (req: Request, res: Response) => {
  console.log("Financial info getting api hit.....");
  const ownerId = (req.user as IRequestUser).profileId;
  const finOrgAccountId = await StripeAccountManager.isAccountNeedToUpdate(ownerId);
  console.log(finOrgAccountId);

  let result = null;
  if (finOrgAccountId) {
    result = await StripeAccountManager.updateFinancialAccountInfo(finOrgAccountId);
  } else {
    result = await PropertyOwnerServices.getFinancialAccountInfo(ownerId);
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Financial data fetching successful!",
    data: result,
  });
});

// get dashboard info
const getDashboardInfo = catchAsync(async (req: Request, res: Response) => {
  const ownerId = (req.user as IRequestUser).profileId;
  const result = await PropertyOwnerServices.getDashboardInfo(ownerId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dashboard information collection Successful!",
    data: result,
  });
});
// ! update extra cost
const updateExtraCost = catchAsync(async (req: Request, res: Response) => {
  const propertyOwnerId = (req.user as IRequestUser).profileId;
  const result = await PropertyOwnerServices.updateExtraCost(propertyOwnerId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update Successful!",
    data: result,
  });
});

export const PropertyOwnerControllers = {
  getAllPropertyOwners,
  getSinglePropertyOwner,
  UpdatePropertyOwner,
  getPropertyOwnerMyProfile,
  getFinancialAccount,
  getDashboardInfo,
  updateExtraCost,
};
