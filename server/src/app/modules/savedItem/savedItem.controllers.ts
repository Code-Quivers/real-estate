import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { SavedItemServices } from "./savedItem.services";
import { IRequestUser } from "../../interfaces/global.interfaces";
<<<<<<< HEAD
<<<<<<< HEAD
import { savedItemFilterableFields } from "./savedItems.constant";
=======
import ApiError from "../../../errors/ApiError";
>>>>>>> 5544faa6ca0b6e4d1dbac7797bda9889bb9a69ae

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

<<<<<<< HEAD
const getAllSavedItems = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, savedItemFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await SavedItemServices.getSavedServiceProviders(filters, options);
=======
=======
import ApiError from "../../../errors/ApiError";

>>>>>>> 26643d1011163c529f23529b7af5a8de461a8739
const getSavedItems = catchAsync(async (req: Request, res: Response) => {
    const itemType = req.query?.itemType;
    const filters = req.query;
    const userId = (req.user as IRequestUser).userId;
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    let result;

    switch (itemType) {
        case 'TENANT':
            result = await SavedItemServices.getSavedTenants(userId, filters, options);
            break;
        case 'SERVICE':
            result = await SavedItemServices.getSavedServiceProviders(userId, filters, options);
            break;
        case undefined:
            throw new ApiError(httpStatus.BAD_REQUEST, "itemType required!!!");
        default:
            throw new ApiError(httpStatus.BAD_REQUEST, `Provided itemType '${itemType}' not supported!!!`);
    }
<<<<<<< HEAD
>>>>>>> 5544faa6ca0b6e4d1dbac7797bda9889bb9a69ae
=======
>>>>>>> 26643d1011163c529f23529b7af5a8de461a8739

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service Providers retrieved successful",
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

const removeSavedItem = catchAsync(async (req: Request, res: Response) => {
    const itemId = req.query?.itemId as string;
    const result = await SavedItemServices.removeSavedItem(itemId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Saved item successfully removed!!!",
    });
})

export const SavedItemConrtollers = {
<<<<<<< HEAD
<<<<<<< HEAD
  createSavedItem,
  getAllSavedItems,
};
=======
=======
>>>>>>> 26643d1011163c529f23529b7af5a8de461a8739
    getSavedItems,
    createSavedItem,
    removeSavedItem,
}
<<<<<<< HEAD
>>>>>>> 5544faa6ca0b6e4d1dbac7797bda9889bb9a69ae
=======

>>>>>>> 26643d1011163c529f23529b7af5a8de461a8739
