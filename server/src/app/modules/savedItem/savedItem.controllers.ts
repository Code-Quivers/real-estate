import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { SavedItemServices } from "./savedItem.services";
import { IRequestUser } from "../../interfaces/global.interfaces";
import { savedItemFilterableFields } from "./savedItems.constant";

// const getSavedItems = catchAsync(async (req: Request, res: Response) => {
//   const itemType = req.query?.itemType;
//   const filters = req.query;
//   const userId = (req.user as IRequestUser).userId;
//   const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
//   let result;
//   if (itemType === "TENANT") {
//     result = await SavedItemServices.getSavedTenants(userId, filters, options);
//   } else if (itemType === "SERVICE") {
//     result = await SavedItemServices.getSavedServiceProviders(userId, filters, options);
//   }

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Service Providers retrieved successful",
//     data: result,
//   });
// });

const getAllSavedItems = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, savedItemFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await SavedItemServices.getSavedServiceProviders(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saved Items retrieved successful",
    data: result,
  });
});

const createSavedItem = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const userId = (req.user as IRequestUser).userId;
  data["userId"] = userId;
  const result = await SavedItemServices.createSavedItem(data);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Service Providers retrieved successful",
    data: result,
  });
});

export const SavedItemConrtollers = {
  createSavedItem,
  getAllSavedItems,
};
