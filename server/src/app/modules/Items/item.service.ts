/* eslint-disable @typescript-eslint/no-explicit-any */
import { Item, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

import { itemSearchableFields } from './item.constants';
import {
  IGetAllItemNames,
  IItemCreateRequest,
  IItemFilterRequest,
  IItemUpdateRequest,
} from './item.interface';

// modules

// !----------------------------------Create New Item---------------------------------------->>>
const createNewItem = async (data: IItemCreateRequest): Promise<Item> => {
  const itemDetails = {
    itemName: data.itemName,
  };

  const isExistItem = await prisma.item.findUnique({
    where: {
      itemName: data?.itemName,
    },
  });

  if (isExistItem) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Item Name is already added, try new'
    );
  }

  const result = await prisma.item.create({
    data: itemDetails,
  });

  return result;
};
// !----------------------------------get all Item---------------------------------------->>>
const getAllItems = async (
  filters: IItemFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Item[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.ItemWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: itemSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map(key => {
      return {
        [key]: {
          equals: (filterData as any)[key],
        },
      };
    });
    andConditions.push({ AND: filterConditions });
  }

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.ItemWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve orders with filtering and pagination
  const result = await prisma.item.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.item.count({
    where: whereConditions,
  });

  // Calculate total pages
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};
// !----------------------------------get all Item Names---------------------------------------->>>
const getAllItemNames = async (
  filters: IItemFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<IGetAllItemNames[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.ItemWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: itemSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Add date range condition if both startDate and endDate are provided

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map(key => {
      return {
        [key]: {
          equals: (filterData as any)[key],
        },
      };
    });
    andConditions.push({ AND: filterConditions });
  }

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.ItemWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve orders with filtering and pagination
  const result = await prisma.item.findMany({
    select: {
      itemId: true,
      itemName: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.item.count({
    where: whereConditions,
  });

  // Calculate total pages
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};
// !----------------------------------get Single Item---------------------------------------->>>
const getSingleItem = async (itemId: string): Promise<Item | null> => {
  const result = await prisma.item.findUnique({
    where: {
      itemId,
    },
    include: {
      Styles: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item Not Found!!');
  }

  return result;
};
// !----------------------------------Update Item---------------------------------------->>>
const updateItemInformation = async (
  itemId: string,
  payload: IItemUpdateRequest
): Promise<Item> => {
  const result = await prisma.$transaction(async transactionClient => {
    const existingItem = await transactionClient.item.findUnique({
      where: {
        itemId,
      },
    });

    if (!existingItem) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Item Not Found!!');
    }

    const updatedItemDetails = {
      itemName: payload?.itemName,
    };

    const updatedItem = await transactionClient.item.update({
      where: {
        itemId,
      },
      data: updatedItemDetails,
    });

    return updatedItem;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update Item Details');
  }

  return result;
};

export const ItemService = {
  createNewItem,
  getAllItems,
  getSingleItem,
  updateItemInformation,
  getAllItemNames,
};
