import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from '../../../shared/sendResponse';
import { PropertyOwnerServices } from "./popertyOwner.services";

const creatOrUpdatePropertyOwner = async (req: Request, res: Response) => {
    const result = await PropertyOwnerServices.createOrUpdatePropertyOwner(req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Property owner created or update successful!',
        data: result
    });

}


export const PropertyOwnerControllers = {
    creatOrUpdatePropertyOwner
}