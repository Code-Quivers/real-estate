import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IRequestUser } from "../../interfaces/global.interfaces";
import { IUploadFile } from "../../../interfaces/file";
import { DocumentsServices } from "./documents.services";

//
const addTemplate = catchAsync(async (req: Request, res: Response) => {
    const ownerId: string = (req.user as IRequestUser).profileId;
    const pdfFile: IUploadFile = req?.file as any;
    const filePath: string = pdfFile.filename;
    const title = req.body?.title || "";
    const result = await DocumentsServices.addTemplate(ownerId, title, filePath)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Template successfully added!",
        data: result,
    });
});
const sendDocument = catchAsync(async (req: Request, res: Response) => {
    const ownerId: string = (req.user as IRequestUser).profileId;
    const pdfFile: IUploadFile = req?.file as any;
    const filePath: string = pdfFile.filename;
    const title = req.body?.title || "";
    const tenantId = req.body?.tenantId || "";
    const propertyId = req.body?.propertyId || "";
    const result = await DocumentsServices.sendDocument(ownerId, title, tenantId, propertyId, filePath)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Document successfully sent!",
        data: result,
    });
});


const updateDocumentWithTenantSigned = catchAsync(async (req: Request, res: Response) => {
    const pdfFile: IUploadFile = req?.file as any;
    const filePath: string = pdfFile.filename;
    const documentId = req.body?.documentId || "";
    const result = await DocumentsServices.updateDocumentWithTenantSigned(documentId, filePath)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Document successfully upadted with teant sign!",
        data: result,
    });
});
export const DocumentsControllers = {
    addTemplate,
    sendDocument,
    updateDocumentWithTenantSigned
};
