/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request } from "express";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { Prisma, Property } from "@prisma/client";
import { IUploadFile } from "../../../interfaces/file";
import { IPropertiesFilterRequest, IPropertyReqPayload } from "./properties.interfaces";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { propertiesRelationalFields, propertiesRelationalFieldsMapper, propertiesSearchableFields } from "./properties.constants";

// ! createNewProperty
const createNewProperty = async (profileId: string, req: Request) => {
  const images: IUploadFile[] = req.files as any;
  console.log('-----------------------------')
  console.log(images.length)
  const imagesPath: { [key: string]: string[] } = {};
  images.forEach((item: IUploadFile) => {
    const propId: string = item.originalname.split('_')[0];
    // Check if the property ID already exists in the imagesPath object
    if (!imagesPath[propId]) {
      imagesPath[propId] = [`property/${item.originalname}`];
    } else {
      // If the ID already exists, push the new value to the array
      imagesPath[propId].push(`property/${item.originalname}`);
    }
  });
  // const imagesPath = images?.map((item: any) => item?.path?.substring(13));

  console.log("images", images);
  console.log("imagesPath", imagesPath);

  const data = req.files;
  return { name: data };
  // console.log(data, images);
  // const toSavedToDb = data.map((obj) => (obj.ownerId = profileId));

  // const property = await prisma.$transaction(async (transactionClient) => {
  //   //

  //   const result = await transactionClient.property.createMany({
  //     data: data,
  //   });
  //   if (!result) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, "Property Creation Failed !");
  //   }
  //   return result;
  // });
  // return property;
};

// Getting all property
const getAllProperty = async (filters: IPropertiesFilterRequest, options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: propertiesSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (propertiesRelationalFields.includes(key)) {
          return {
            [propertiesRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.PropertyWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};
  //
  const result = await prisma.$transaction(async (transactionClient) => {
    const properties = await transactionClient.property.findMany({
      include: {
        owner: true,
      },
      where: whereConditions,
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
              createdAt: "desc",
            },
    });
    const total = await prisma.property.count({
      where: whereConditions,
    });

    const totalPage = Math.ceil(total / limit);
    return {
      meta: {
        page,
        limit,
        total,
        totalPage,
      },
      data: properties,
    };
  });

  return result;
};
//! get single property info
const getSinglePropertyInfo = async (propertyId: string): Promise<Property | null> => {
  const res = await prisma.$transaction(async (transactionClient) => {
    const properties = await transactionClient.property.findUnique({
      where: {
        propertyId,
      },
      include: {
        owner: true,
      },
    });

    if (!properties) {
      throw new ApiError(httpStatus.NOT_FOUND, "Property Not Found");
    }

    return properties;
  });
  return res;
};
// ! update property info
const updatePropertyInfo = async (propertyId: string, req: Request): Promise<Property> => {
  const images: IUploadFile[] = req.files as any;

  const imagesPath = images?.map((item: any) => item?.path);

  const { address, allowedPets, description, maintenanceCoveredOwner, maintenanceCoveredTenant, numOfBath, numOfBed, schools, universities } = req?.body as IPropertyReqPayload;

  const result = await prisma.$transaction(async (transactionClient) => {
    const updatedPropertyData: Partial<Property> = {};

    if (address) updatedPropertyData["address"] = address;
    if (description) updatedPropertyData["description"] = description;
    if (maintenanceCoveredTenant) updatedPropertyData["maintenanceCoveredTenant"] = maintenanceCoveredTenant;
    if (maintenanceCoveredOwner) updatedPropertyData["maintenanceCoveredOwner"] = maintenanceCoveredOwner;
    if (schools) updatedPropertyData["schools"] = schools;
    if (universities) updatedPropertyData["universities"] = universities;
    if (allowedPets) updatedPropertyData["allowedPets"] = allowedPets;
    if (imagesPath?.length) updatedPropertyData["images"] = imagesPath;
    if (numOfBath) updatedPropertyData["numOfBath"] = Number(numOfBath);
    if (numOfBed) updatedPropertyData["numOfBed"] = Number(numOfBed);

    //
    const updatedProperty = await transactionClient.property.update({
      where: {
        propertyId,
      },
      data: updatedPropertyData,
    });
    if (!updatedProperty) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Property Creation Failed !");
    }
    return updatedProperty;
  });
  return result;
};
export const PropertiesService = {
  createNewProperty,
  getAllProperty,
  getSinglePropertyInfo,
  updatePropertyInfo,
};
