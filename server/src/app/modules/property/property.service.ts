/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IPropertyReqPayload } from './property.interfaces';
import { Property } from '@prisma/client';

const propertyAdd = async (payload: IPropertyReqPayload) => {
  const { images, data } = payload;
  const imagesPath = images.map((item: any) => item.path);

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
      ownerId: payload.profileId,
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
    if (properties.length >= 0) {
      return properties;
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Property fetching failed!!!');
    }
  });
  return res;
};

// Getting a single property
const getPropertyInfo = async (
  propertyId: string
): Promise<Property | null> => {
  const result = await prisma.property.findUnique({
    where: {
      propertyId,
    },
    include: {
      owner: true,
    },
  });

  if (result === null) {
    console.log('result is null', result);
    // throw new ApiError(httpStatus.NOT_FOUND, 'Property Not Found !!');
  }

  return result;
};

export const PropertyServices = {
  propertyAdd,
  getAllProperty,
  getPropertyInfo,
};
