import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { SavedItemServices } from "./savedItem.services";
import { IRequestUser } from "../../interfaces/global.interfaces";
import ApiError from "../../../errors/ApiError";
import { ItemType } from "@prisma/client";

//! get saved items
const getSavedItems = catchAsync(async (req: Request, res: Response) => {
  const itemType = req.query?.itemType as ItemType;
  const filters = req.query;
  const userId = (req.user as IRequestUser).userId;
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  let result;

  switch (itemType) {
    case "TENANT":
      result = await SavedItemServices.getSavedTenants(userId, filters, options);
      break;
    case "SERVICE":
      result = await SavedItemServices.getSavedServiceProviders(userId, filters, options);
      break;
    case "PROPERTY":
      result = await SavedItemServices.getSavedUnits(userId, filters, options);
      break;

    case undefined:
      throw new ApiError(httpStatus.BAD_REQUEST, "itemType required!!!");
    default:
      throw new ApiError(httpStatus.BAD_REQUEST, `Provided itemType '${itemType}' not supported!!!`);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Items Retrieved Successful",
    data: result,
  });
});

// ! add to saved item
const createSavedItem = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const userId = (req.user as IRequestUser).userId;
  data["userId"] = userId;
  const result = await SavedItemServices.createSavedItem(data);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Saved Successfully",
    data: result,
  });
});
// ! remove from saved item
const removeSavedItem = catchAsync(async (req: Request, res: Response) => {
  const itemId = req.query?.itemId as string;
  const result = await SavedItemServices.removeSavedItem(itemId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully Removed",
    data: result,
  });
});

export const SavedItemControllers = {
  getSavedItems,
  createSavedItem,
  removeSavedItem,
};
