import { Request, Response } from "express"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { IUploadFile } from "../../../interfaces/file"
import { PropertyServices } from "./property.services"

const addProperty = async (req: Request, res: Response) => {
    const images: IUploadFile[] = req.files;
    const data = req.body?.data;
    const payload = { images, data:JSON.parse(data) };
    const result = PropertyServices.propertyAdd(payload);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Property successfully added!!!',
    })
}


export const PropertyController = {
    addProperty
}