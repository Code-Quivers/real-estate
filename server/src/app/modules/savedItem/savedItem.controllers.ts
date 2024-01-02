import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { SavedItemServices } from "./savedItem.services";
import { IRequestUser } from "../../interfaces/global.interfaces";



const getSavedItems = catchAsync(async (req: Request, res: Response) => {
    console.log(req.query)
    const name = req.query?.name;
    const address = req.query?.address;
    const rent = req.query?.rent;
    const itemType = req.query?.itemType;
    const filters = req.query;
    const userId = (req.user as IRequestUser).userId;
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    let result;
    if (itemType === 'TENANT') {
        console.log("helloo TENANT")
        result = await SavedItemServices.getSavedTenants(userId, filters, options);
    }
    else if (itemType === 'SERVICE') {
        result = await SavedItemServices.getSavedServiceProviders(userId, filters, options);

    }

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
    data['userId'] = userId
    const result = await SavedItemServices.createSavedItem(data)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Service Providers retrieved successful",
        data: result,
    });
})

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
    getSavedItems,
    createSavedItem,
    removeSavedItem,
}