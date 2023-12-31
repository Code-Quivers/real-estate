import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { SavedItemServices } from "./savedItem.services";
import { IRequestUser } from "../../interfaces/global.interfaces";



const getSavedItems = catchAsync(async (req: Request, res: Response) => {
    const searchTerm = req.query.searchTerm;
    const name = req.query?.name;
    const address = req.query?.address;
    const rent = req.query?.rent;
    const filters = {
        name, address, rent
    }
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await SavedItemServices.getSavedItems(filters, options);

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

export const SavedItemConrtollers = {
    getSavedItems,
    createSavedItem
}