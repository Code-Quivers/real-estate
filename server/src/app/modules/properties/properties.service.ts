/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { Property } from '@prisma/client';
import { IUploadFile } from '../../../interfaces/file';
import { IPropertyReqPayload } from './properties.interfaces';

// ! createNewProperty
const createNewProperty = async (
  profileId: string,
  req: Request
): Promise<Property> => {
  const images: IUploadFile[] = req.files as any;

  const imagesPath = images?.map((item: any) => item?.path);

  const data = req?.body as IPropertyReqPayload;

  const property = await prisma.$transaction(async transactionClient => {
    //
    const propertyData = {
      numOfBed: data?.numOfBed,
      numOfBath: data?.numOfBath,
      address: data?.address,
      description: data?.description,
      maintenanceCoveredTenant: data?.maintenanceCoveredTenant,
      maintenanceCoveredOwner: data?.maintenanceCoveredOwner,
      schools: data?.schools,
      universities: data?.universities,
      allowedPets: data?.allowedPets,
      ownerId: profileId,
      images: imagesPath,
    };
    const result = await transactionClient.property.create({
      data: propertyData,
      include: {
        owner: true,
      },
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Property Creation Failed !');
    }
    return result;
  });
  return property;
};
// Getting all property
const getAllProperty = async () => {
  const res = await prisma.$transaction(async transactionClient => {
    const properties = await transactionClient.property.findMany();

    return properties;
  });

  return res;
};
// get single property info
const getSinglePropertyInfo = async (
  propertyId: string
): Promise<Property | null> => {
  const res = await prisma.$transaction(async transactionClient => {
    const properties = await transactionClient.property.findUnique({
      where: {
        propertyId,
      },
      include: {
        owner: true,
      },
    });

    if (!properties) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Property Not Found');
    }

    return properties;
  });
  return res;
};

export const PropertiesService = {
  createNewProperty,
  getAllProperty,
  getSinglePropertyInfo,
};
