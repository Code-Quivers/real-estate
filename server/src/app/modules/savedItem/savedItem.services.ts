/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { Prisma } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import { isEmptyObject } from "../../../helpers/utils";
import { ICreateSavedItem } from "./savedItem.interfaces";
import {
  propertiesRelationalFields,
  propertiesRelationalFieldsMapper,
  propertiesSearchableFields,
} from "../properties/properties.constants";

const createSavedItem = async (data: ICreateSavedItem) => {
  // saved the item to the SavedItem model.

  const result = await prisma.$transaction(async (transactionClient) => {
    if (data?.itemType === "TENANT") {
      const isExistTenantItem = await transactionClient.savedItem.findFirst({
        where: {
          itemType: data?.itemType,
          tenantId: data?.tenantId,
          userId: data?.userId,
        },
      });

      if (isExistTenantItem) throw new ApiError(httpStatus.CONFLICT, "Tenant already saved!!");

      const isExistTenant = await transactionClient.tenant.findFirst({
        where: {
          tenantId: data?.tenantId,
        },
      });

      if (!isExistTenant) throw new ApiError(httpStatus.CONFLICT, "Tenant Not Exist!!");
    }
    if (data?.itemType === "SERVICE") {
      const isExistTenantItem = await transactionClient.savedItem.findFirst({
        where: {
          itemType: data?.itemType,
          serviceProviderId: data?.serviceProviderId,
          userId: data?.userId,
        },
      });

      if (isExistTenantItem) throw new ApiError(httpStatus.CONFLICT, "Service Provider already saved!!");
    }
    //  if item type is property
    if (data?.itemType === "PROPERTY") {
      const isExistPropertyItem = await transactionClient.savedItem.findFirst({
        where: {
          itemType: data?.itemType,
          propertyId: data?.propertyId,
          userId: data?.userId,
        },
      });

      if (isExistPropertyItem) throw new ApiError(httpStatus.CONFLICT, "Unit Already saved !");
    }

    const savedItem = await transactionClient.savedItem.create({
      data: data,
    });
    if (!savedItem) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Item saving failed!!!");
    }
    return savedItem;
  });

  return result;
};

// Remove Saved Item
const removeSavedItem = async (itemId: string) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const removedItem = await transactionClient.savedItem.delete({
      where: {
        itemId: itemId,
      },
    });
    if (!removedItem) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Item saving failed!!!");
    }
    return removedItem;
  });
  return result;
};

const getSavedTenants = async (userId: string, filters: any, options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { name, address, rent } = filters;
  const orCondition: any[] = [];
  if (name) {
    orCondition.push({ firstName: { contains: name } });
    orCondition.push({ lastName: { contains: name } });
  }
  const tenantFilteringCondition: any = {};
  if (orCondition.length == 2) tenantFilteringCondition.OR = orCondition;

  if (address) tenantFilteringCondition.presentAddress = { contains: filters.address };

  if (rent) tenantFilteringCondition.affordableRentAmount = { gte: filters.rent };

  const whereConditions: Prisma.SavedItemWhereInput = {
    AND: [
      { userId, itemType: "TENANT" },
      ...(!isEmptyObject(tenantFilteringCondition) ? [{ tenant: tenantFilteringCondition }] : []),
    ],
  };

  //
  const result = await prisma.$transaction(async (transactionClient) => {
    const savedItems = await transactionClient.savedItem.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
              createdAt: "desc",
            },
      include: {
        tenant: true,
      },
    });

    const total = await prisma.savedItem.count({
      where: whereConditions,
    });
    const totalPage = Math.ceil(total / limit);

    if (!savedItems) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to retrieved saved items!!!");
    }

    return {
      meta: {
        page,
        limit,
        total,
        totalPage,
      },
      data: savedItems,
    };
  });

  return result;
};

// Get the saved Service Providers
const getSavedServiceProviders = async (userId: string, filters: any, options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { name, serviceType, priority, price } = filters;
  const orCondition: any[] = [];
  if (name) {
    orCondition.push({ firstName: { contains: name } });
    orCondition.push({ lastName: { contains: name } });
  }
  const serviceProviderFilterCondition: any = {};
  if (orCondition.length == 2) {
    serviceProviderFilterCondition.OR = orCondition;
  }
  const serviceFilterCondition: any = {};

  if (serviceType) {
    serviceFilterCondition.serviceType = serviceType;
  }
  if (priority) {
    serviceFilterCondition.serviceAvailability = priority;
  }
  if (price) {
    serviceFilterCondition.minPrice = { gte: price };
    serviceFilterCondition.maxPrice = { lte: price };
  }
  if (!isEmptyObject(serviceFilterCondition)) {
    serviceProviderFilterCondition.Service = serviceFilterCondition;
  }

  const andCondition = [];
  andCondition.push({
    userId: userId,
    itemType: "SERVICE",
  });
  if (!isEmptyObject(serviceProviderFilterCondition)) {
    andCondition.push({ serviceProvider: serviceProviderFilterCondition });
  }
  // @ts-ignore
  const whereConditions: Prisma.SavedItemWhereInput = { AND: andCondition };
  //
  const result = await prisma.$transaction(async (transactionClient) => {
    const savedItems = await transactionClient.savedItem.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
              createdAt: "desc",
            },
      include: {
        serviceProvider: {
          include: {
            Service: true,
          },
        },
      },
    });
    const total = await prisma.savedItem.count({
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
      data: savedItems,
    };
  });

  return result;
};

// ! get saved units
const getSavedUnits = async (userId: string, filters: any, options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Extract search term and filter data from filters object
  const { searchTerm, itemType, ...filterData } = filters;

  // Initialize array to hold filtering conditions
  const andConditions = [];

  // Search: Create conditions for searching properties by fields
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

  // Filter: Create conditions for filtering properties based on filter data
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
  // Combine all conditions into Prisma's whereConditions
  const whereConditions: Prisma.SavedItemWhereInput = {
    AND: [{ userId, itemType }, ...(andConditions.length > 0 ? [{ property: { AND: andConditions } }] : [])],
  };

  //
  const result = await prisma.$transaction(async (transactionClient) => {
    const savedItems = await transactionClient.savedItem.findMany({
      where: whereConditions,
      skip,
      take: limit,

      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
              createdAt: "desc",
            },
      include: {
        property: {
          include: {
            owner: {
              select: {
                userId: true,
                profileImage: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    const total = await prisma.savedItem.count({
      where: whereConditions,
    });
    const totalPage = Math.ceil(total / limit);

    if (!savedItems) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to retrieved saved items!!!");
    }

    return {
      meta: {
        page,
        limit,
        total,
        totalPage,
      },
      data: savedItems,
    };
  });

  return result;
};

export const SavedItemServices = {
  getSavedTenants,
  getSavedServiceProviders,
  createSavedItem,
  removeSavedItem,
  getSavedUnits,
};
