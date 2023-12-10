import { Factory, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

import { factorySearchableFields } from './factory.constants';
import {
  IFactoryCreateRequest,
  IFactoryFilterRequest,
  IFactoryGetAllNames,
  IFactoryUpdateRequest,
} from './factory.interface';

// modules

// !----------------------------------Create New Factory---------------------------------------->>>
const createNewFactory = async (
  data: IFactoryCreateRequest
): Promise<Factory> => {
  const factoryDetails = {
    factoryName: data.factoryName,
    factoryAddress: data.factoryAddress,
  };

  const isExistFactory = await prisma.factory.findUnique({
    where: {
      factoryName: factoryDetails?.factoryName,
    },
  });

  if (isExistFactory) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Factory Name is already added, try new'
    );
  }

  const result = await prisma.factory.create({
    data: factoryDetails,
  });

  return result;
};
// !----------------------------------get all Factory---------------------------------------->>>
const getAllFactories = async (
  filters: IFactoryFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Factory[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, startDate, endDate, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.FactoryWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: factorySearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Add date range condition if both startDate and endDate are provided
  if (startDate && endDate) {
    andConditions.push({
      createdAt: {
        gte: startDate, // Greater than or equal to startDate
        lte: endDate, // Less than or equal to endDate
      },
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
  const whereConditions: Prisma.FactoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve orders with filtering and pagination
  const result = await prisma.factory.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.factory.count({
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
// !----------------------------------get all Factory Name and Id---------------------------------------->>>
const getAllFactoryNames = async (
  filters: IFactoryFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<IFactoryGetAllNames[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, startDate, endDate, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.FactoryWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: factorySearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Add date range condition if both startDate and endDate are provided
  if (startDate && endDate) {
    andConditions.push({
      createdAt: {
        gte: startDate, // Greater than or equal to startDate
        lte: endDate, // Less than or equal to endDate
      },
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
  const whereConditions: Prisma.FactoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve orders with filtering and pagination
  const result = await prisma.factory.findMany({
    select: {
      factoryId: true,
      factoryName: true,
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
  const total = await prisma.factory.count({
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
// !----------------------------------get Single Factory---------------------------------------->>>
const getSingleFactory = async (factoryId: string): Promise<Factory | null> => {
  const result = await prisma.factory.findUnique({
    where: {
      factoryId,
    },
    include: {
      Styles: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Factory Not Found!!');
  }

  return result;
};
// !----------------------------------Update Factory---------------------------------------->>>
const updateFactoryInformation = async (
  factoryId: string,
  payload: IFactoryUpdateRequest
): Promise<Factory> => {
  const result = await prisma.$transaction(async transactionClient => {
    const existingFactory = await transactionClient.factory.findUnique({
      where: {
        factoryId,
      },
    });

    if (!existingFactory) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Factory Not Found!!');
    }

    if (payload.factoryName !== undefined) {
      const existingFactoryName = await transactionClient.factory.findUnique({
        where: {
          factoryName: payload?.factoryName,
        },
      });

      if (existingFactoryName) {
        throw new ApiError(httpStatus.CONFLICT, 'Factory Name already used !');
      }
    }

    const updatedFactoryDetails = {
      factoryName: payload.factoryName,
      factoryAddress: payload.factoryAddress,
    };

    const updatedFactory = await transactionClient.factory.update({
      where: {
        factoryId,
      },
      data: updatedFactoryDetails,
    });

    return updatedFactory;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update Factory');
  }

  return result;
};

// !----------------------------------get all Stylish---------------------------------------->>>

const getAllFactoriesLength = async (): Promise<{
  total: number | null;
  currentYear: number | null;
  lastYear: number | null;
}> => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Get the current month (1-12)

  // Calculate the fiscal year
  const fiscalYear = currentMonth < 4 ? currentYear - 1 : currentYear;

  // Calculate the start date for the fiscal year
  const fiscalYearStartDate = new Date(fiscalYear, 3, 1); // April 1st of the fiscal year

  // Use Prisma to count all-time orders
  const total = await prisma.factory.count();

  // Use Prisma to count orders created within the current fiscal year
  const currentYearCount = await prisma.factory.count({
    where: {
      createdAt: {
        gt: fiscalYearStartDate,
        lt: currentDate,
      },
    },
  });

  // Use Prisma to count orders created within the last fiscal year
  const lastYearCount = await prisma.factory.count({
    where: {
      createdAt: {
        gte: new Date(fiscalYear - 1, 3, 1), // April 1st of the last fiscal year
        lte: new Date(fiscalYear, 2, 31), // March 31st of the last fiscal year
      },
    },
  });

  return { total, currentYear: currentYearCount, lastYear: lastYearCount };
};

export const FactoryService = {
  createNewFactory,
  getAllFactories,
  getSingleFactory,
  updateFactoryInformation,
  getAllFactoryNames,
  getAllFactoriesLength,
};
