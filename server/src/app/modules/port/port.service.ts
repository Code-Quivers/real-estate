import { Port, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

import { portSearchableFields } from './port.constants';
import {
  IGetAllPortNames,
  IPortCreateRequest,
  IPortFilterRequest,
  IPortUpdateRequest,
} from './port.interface';

// modules

// !----------------------------------Create New Port---------------------------------------->>>
const createNewPort = async (data: IPortCreateRequest): Promise<Port> => {
  const portDetails = {
    portName: data.portName,
    portAddress: data.portAddress,
  };

  const result = await prisma.port.create({
    data: portDetails,
  });

  return result;
};
// !----------------------------------get all Port---------------------------------------->>>
const getAllPorts = async (
  filters: IPortFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Port[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, startDate, endDate, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.PortWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: portSearchableFields.map((field: any) => ({
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
  const whereConditions: Prisma.PortWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve orders with filtering and pagination
  const result = await prisma.port.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.port.count({
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
// !----------------------------------get all Port Names---------------------------------------->>>
const getAllPortNames = async (
  filters: IPortFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<IGetAllPortNames[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, startDate, endDate, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.PortWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: portSearchableFields.map((field: any) => ({
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
  const whereConditions: Prisma.PortWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve orders with filtering and pagination
  const result = await prisma.port.findMany({
    select: {
      portId: true,
      portName: true,
      portAddress: true,
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
  const total = await prisma.port.count({
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
// !----------------------------------get Single Port---------------------------------------->>>
const getSinglePort = async (portId: string): Promise<Port | null> => {
  const result = await prisma.port.findUnique({
    where: {
      portId,
    },
    include: {
      orders: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Port Not Found!!');
  }

  return result;
};
// !----------------------------------Update Port---------------------------------------->>>
const updatePortInformation = async (
  portId: string,
  payload: IPortUpdateRequest
): Promise<Port> => {
  const result = await prisma.$transaction(async transactionClient => {
    const existingFactory = await transactionClient.port.findUnique({
      where: {
        portId,
      },
    });

    if (!existingFactory) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Port Not Found!!');
    }

    const updatedFactoryDetails = {
      portName: payload?.portName,
      portAddress: payload?.portAddress,
    };

    const updatedFactory = await transactionClient.port.update({
      where: {
        portId,
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

export const PortService = {
  createNewPort,
  getAllPorts,
  getSinglePort,
  updatePortInformation,
  getAllPortNames,
};
