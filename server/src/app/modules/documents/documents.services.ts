/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";

const getTemplates = async (ownerId: string) => {
  try {
    const property = await prisma.propertyOwner.findUnique({
      where: { propertyOwnerId: ownerId },
      select: {
        templates: true,
      },
    });
    return property?.templates;
  } catch (err) {
    console.log("Error in getTemplates service: ", err);
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to get templates!");
  }
};

const getTemplate = async (ownerId: string, templateId: number) => {
  try {
    const property = await prisma.propertyOwner.findUnique({
      where: { propertyOwnerId: ownerId },
      select: {
        templates: true,
      },
    });
    if (property?.templates && property.templates.length > 0) {
      return property.templates[templateId];
    } else {
      return [];
    }
  } catch (err) {
    console.log("Error in getTemplate service: ", err);
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to get the template!");
  }
};

/**
 * add template to the property owner
 *
 */
const addTemplate = async (ownerId: string, title: string, filePath: string) => {
  try {
    const template = { title, filePath };
    const result = await prisma.$transaction(async (transactionClient) => {
      const propertyOwner = await transactionClient.propertyOwner.findUnique({
        where: { propertyOwnerId: ownerId },
        select: {
          templates: true,
        },
      });
      let data: any[] = [];
      if (propertyOwner?.templates) {
        data = propertyOwner.templates;
      }
      data.push(template);
      const updatedData = await transactionClient.propertyOwner.update({
        where: { propertyOwnerId: ownerId },
        data: { templates: data },
      });
      return updatedData;
    });

    // Return the result of the transaction
    return result;
  } catch (err) {
    console.log("Error in add template service: ", err);
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to add template!");
  }
};

const removeTemplate = async (ownerId: string, title: string, filePath: string) => {
  try {
    // const template = { title, filePath }
    const result = await prisma.$transaction(async (transactionClient) => {
      const propertyOwner = await transactionClient.propertyOwner.findUnique({
        where: { propertyOwnerId: ownerId },
        select: {
          templates: true,
        },
      });
      let data: any[] = [];
      if (propertyOwner?.templates) {
        data = propertyOwner.templates.map((template) => template?.filePath != filePath);
      }
      const updatedData = await transactionClient.propertyOwner.update({
        where: { propertyOwnerId: ownerId },
        data: { templates: data },
      });
      return updatedData;
    });

    // Return the result of the transaction
    return result;
  } catch (err) {
    console.log("Error in remove template service: ", err);
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to remove template!");
  }
};

const sendDocument = async (ownerId: string, title: string, tenantId: string, propertyId: string, filePath: string) => {
  try {
    // const template = { title, filePath }
    const result = await prisma.$transaction(async (transactionClient) => {
      const docData = {
        documentTitle: title,
        tenantId: tenantId,
        propertyId: propertyId,
        ownerId: ownerId,
        filePath: filePath,
      };
      const newDocument = await transactionClient.document.create({
        data: docData,
      });
      return newDocument;
    });

    // Return the result of the transaction
    return result;
  } catch (err) {
    console.log("Error in send document service: ", err);
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to send document!");
  }
};

const updateDocumentWithTenantSigned = async (documentId: string, filePath: string, documentTitle: string) => {
  try {
    // const template = { title, filePath }
    const result = await prisma.$transaction(async (transactionClient) => {
      const dataToUpdate = {
        isSignedByTenant: true,
        filePath: filePath,
        documentTitle,
      };
      const updatedDocument = await transactionClient.document.update({
        where: { documentId },
        data: dataToUpdate,
      });
      return updatedDocument;
    });

    // Return the result of the transaction
    return result;
  } catch (err) {
    console.log("Error in updateDocumentWithTenantSigned service: ", err);
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to update document!");
  }
};

const getDocuments = async (profileId: string, userRole: string) => {
  try {
    let documents: any = [];

    // Check user role and fetch documents.
    if (userRole === "TENANT") {
      documents = await prisma.document.findMany({
        where: { tenantId: profileId },
      });
    } else if (userRole === "PROPERTY_OWNER") {
      documents = await prisma.document.findMany({
        where: { ownerId: profileId },
      });
    }

    return documents;
  } catch (err) {
    console.log("Error in getDocuments service: ", err);
    throw new ApiError(httpStatus.BAD_REQUEST, `Failed to get documents for ${userRole}!`);
  }
};

const getDocument = async (documentId: string) => {
  try {
    const document = await prisma.document.findUnique({
      where: { documentId: documentId },
    });
    return document;
  } catch (err) {
    console.log("Error in getDocument service: ", err);
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to get the document!");
  }
};

export const DocumentsServices = {
  getTemplates,
  getTemplate,
  addTemplate,
  removeTemplate,
  getDocuments,
  getDocument,
  sendDocument,
  updateDocumentWithTenantSigned,
};
