import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { savedItemServices } from "./saveItem.services";



const getSavedItems = catchAsync(async (req: Request, res: Response) => {
    const searchTerm = req.query.searchTerm;
    const name = req.query?.name;
    const address = req.query?.address;
    const rent = req.query?.rent;
    const filters = {
        name, address, rent
    }
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await savedItemServices.getSavedItems(filters, options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service Providers retrieved successful",
        data: result,
    });
});


// const createSavedItem = catchAsync(async (req: Request, res: Response) => {
//     sendResponse(res, {
//         statusCode: httpStatus.CREATED,
//         success: true,
//         message: "Service Providers retrieved successful",
//         data: {},
//     });
// })

export const SavedItemConrtollers = {
    getSavedItems
}