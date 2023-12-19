import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from '../../../shared/sendResponse';
import { TenantServices } from "./tenant.services";



const getTenants = async (req: Request, res: Response) => {
    const result = await TenantServices.getTenants()

    if (result?.length === 0) {
        sendResponse(res, {
            statusCode: httpStatus.NO_CONTENT,
            success: true,
        });
    }
    else {
        sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: "Tenant fetching successfull",
            data: result
        });
    }


}


export const TenantControllers = {
    getTenants
}