/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request } from "express";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { OrderRequest, Prisma, Property } from "@prisma/client";
import { IUploadFile } from "../../../interfaces/file";
import {
  IAssignServiceProviderToProperty,
  IAssignTenantToProperty,
  IPropertiesFilterRequest,
  IPropertyData,
  IPropertyReqPayload,
} from "./properties.interfaces";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import {
  propertiesRelationalFields,
  propertiesRelationalFieldsMapper,
  propertiesSearchableFields,
} from "./properties.constants";

// ! createNewProperty
const createNewProperty = async (profileId: string, req: Request) => {
  // Ensure req.files and req.body exist and have correct types
  const images: IUploadFile[] = (req.files as any) || [];
  const data: any[] = req?.body || [];

  // Use meaningful variable names
  const imagesPath: { [key: number]: string[] } = {};
  // Process images
  images.forEach((image: IUploadFile) => {
    const propId: number = parseInt(image.originalname.split("_")[0]);

    // Use the logical nullish assignment operator to handle undefined case
    imagesPath[propId] ??= [];
    imagesPath[propId].push(`property/${image.originalname}`);
  });

  // Process property info
  const propertyInfo: IPropertyData[] = data.map((item: any) => {
    const propId: number = item.id;
    const imagesForId: string[] = imagesPath[propId] || []; // Handle case when no images found for property id
    return {
      ...item, // Spread the properties of item
      images: imagesForId,
      ownerId: profileId, // Assuming profileId is defined somewhere
    };
  });

  // Remove the 'id' property from each item in propertyInfo
  propertyInfo.forEach((item: any) => {
    delete item["id"];
  });

  const property = await prisma.$transaction(async (transactionClient) => {
    const result = await transactionClient.property.createMany({
      data: propertyInfo,
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Property Creation Failed !");
    }
    return result;
  });
  return property;
};

// ! Getting all property
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

// ! get my all properties for property owner
// Getting all property
const getPropertyOwnerAllProperty = async (
  profileId: string,
  filters: IPropertiesFilterRequest,
  options: IPaginationOptions,
) => {
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
        Tenant: true,
        _count: true,
        orderRequest: true,

        // serviceProviders: {
        //   include: {
        //     Service: true,
        //     user: {
        //       select: {
        //         email: true,
        //       },
        //     },
        //   },
        // },
      },
      where: {
        ...whereConditions,
        owner: {
          propertyOwnerId: profileId,
        },
      },

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
      where: {
        ...whereConditions,
        owner: {
          propertyOwnerId: profileId,
        },
      },
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

  const {
    address,
    allowedPets,
    description,
    maintenanceCoveredOwner,
    maintenanceCoveredTenant,
    numOfBath,
    numOfBed,
    schools,
    universities,
  } = req?.body as IPropertyReqPayload;

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

// ! assign tenant user to property or unit -----------------

const assignTenantToProperty = async (profileId: string, payload: IAssignTenantToProperty) => {
  const { propertyId, tenantId } = payload;

  const result = await prisma.$transaction(async (transactionClient) => {
    // check if owner or not
    const isOwner = await transactionClient.property.findUnique({
      where: {
        propertyId,
        ownerId: profileId,
      },
    });

    if (!isOwner) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "You are not the owner of this property or this property does not exist",
      );
    }

    // check if already assigned to other property
    const isAlreadyAssigned = await transactionClient.tenant.findUnique({
      where: {
        tenantId,
        property: {
          isNot: null,
        },
      },
    });

    if (isAlreadyAssigned) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Tenant is already assigned to other property");
    }
    // check is property already booked or not

    const isPropertyBooked = await prisma.property.findUnique({
      where: {
        propertyId,
        Tenant: {
          isNot: null,
        },
      },
    });

    if (isPropertyBooked) {
      throw new ApiError(httpStatus.CONFLICT, "Property is Already Booked");
    }

    // update logic
    const res = await transactionClient.tenant.update({
      where: {
        tenantId, // use tenantId here for the update
      },
      data: {
        property: {
          connect: {
            propertyId,
          },
        },
      },
      select: {
        tenantId: true,
        property: true,
      },
    });

    if (res) {
      await transactionClient.property.update({
        where: {
          propertyId,
        },
        data: {
          isRented: true,
        },
      });
    }

    if (!res) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Tenant Assign Failed");
    }

    return res;
  });

  return result;
};

// ! assign service providers to property -----------
const assignServiceProviderToProperty = async (
  profileId: string,
  payload: IAssignServiceProviderToProperty,
): Promise<OrderRequest> => {
  const { propertyId, serviceProviderId } = payload;

  const result = await prisma.$transaction(async (transactionClient) => {
    // Check if the user is the owner of the property
    const isOwner = await transactionClient.property.findFirst({
      where: {
        propertyId,
        ownerId: profileId,
      },
    });

    if (!isOwner) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "You are not the owner of this property or this property does not exist",
      );
    }

    // Check if the property is already assigned to the serviceProvider
    const isAlreadyAssigned = await transactionClient.orderRequest.findFirst({
      where: {
        propertyId,
        serviceProviderId,
      },
    });

    if (isAlreadyAssigned) {
      throw new ApiError(httpStatus.CONFLICT, "Already Assigned by this Provider");
    }

    // Assign the serviceProvider to the property
    const res = await transactionClient.orderRequest.create({
      data: {
        propertyId,
        serviceProviderId,
      },
    });

    if (!res) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Service Provider Assign Failed");
    }

    return res;
  });

  return result;
};

export const PropertiesService = {
  createNewProperty,
  getAllProperty,
  getSinglePropertyInfo,
  updatePropertyInfo,
  getPropertyOwnerAllProperty,
  assignTenantToProperty,
  assignServiceProviderToProperty,
};
