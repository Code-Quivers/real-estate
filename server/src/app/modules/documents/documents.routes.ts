import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import { FileUploadHelper } from "../../../helpers/FileUploadHelper";
import { DocumentValidations } from "./documents.validations";
import { DocumentsControllers } from "./documents.controllers";


const router = express.Router();
// ! get all tenants
router.post(
    "/add-template",
    auth(UserRoles.PROPERTY_OWNER,),
    FileUploadHelper.uploadDocumentFile.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = DocumentValidations.addTemplate.parse(JSON.parse(req.body.data));
        return DocumentsControllers.addTemplate(req, res, next);
    },
);

router.post(
    "/send-document",
    auth(UserRoles.PROPERTY_OWNER,),
    FileUploadHelper.uploadDocumentFile.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = DocumentValidations.sendDocument.parse(JSON.parse(req.body.data));
        return DocumentsControllers.sendDocument(req, res, next);
    },
);

router.patch(
    "/update-document-with-tenant-sign",
    auth(UserRoles.TENANT,),
    FileUploadHelper.uploadDocumentFile.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = DocumentValidations.updateDocument.parse(JSON.parse(req.body.data));
        return DocumentsControllers.updateDocumentWithTenantSigned(req, res, next);
    },
);

export const DocumentsRoutes = router;
