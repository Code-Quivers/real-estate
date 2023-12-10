import { PPStrikeOffStatus, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

import { portSearchableFields } from './PPStrikeOffStatus.constants';
import {
  IPPStrikeOffStatusCreateRequest,
  IPPStrikeOffStatusFilterRequest,
  IPPStrikeOffStatusUpdateRequest,
} from './PPStrikeOffStatus.interface';

// modules

// !----------------------------------Create New Strike Off Status---------------------------------------->>>
const createNewPPStrikeOffStatus = async (
  profileId: string,
  data: IPPStrikeOffStatusCreateRequest
): Promise<PPStrikeOffStatus> => {
  const isExistStyle = await prisma.styles.findUnique({
    where: {
      styleNo: data?.styleNo,
    },
  });
  if (!isExistStyle) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Style Not Found !!');
  }

  const PPStrikeOffStatusDetails = {
    ppStatusComment: data?.ppStatusComment,
    styleNo: data?.styleNo,
    profileId,
  };

  const result = await prisma.pPStrikeOffStatus.create({
    data: PPStrikeOffStatusDetails,
    include: {
      style: true,
    },
  });

  return result;
};
// !----------------------------------get all Strike Off Status---------------------------------------->>>
const getAllPPStrikeOffStatus = async (
  filters: IPPStrikeOffStatusFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<PPStrikeOffStatus[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, startDate, endDate, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.PPStrikeOffStatusWhereInput[] = [];

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
  const whereConditions: Prisma.PPStrikeOffStatusWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve orders with filtering and pagination
  const result = await prisma.pPStrikeOffStatus.findMany({
    include: {
      style: true,
      profile: true,
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
  const total = await prisma.pPStrikeOffStatus.count({
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
// !----------------------------------get Single Strike Off Status---------------------------------------->>>
const getSinglePPStrikeOffStatus = async (
  ppStatusId: string
): Promise<PPStrikeOffStatus | null> => {
  const result = await prisma.pPStrikeOffStatus.findUnique({
    where: {
      ppStatusId,
    },
    include: {
      style: true,
      profile: true,
    },
  });

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'PP Strike off Status Not Found!!'
    );
  }

  return result;
};
// !----------------------------------Update Strike Off Status---------------------------------------->>>
const updatePortPPStrikeOffStatus = async (
  ppStatusId: string,
  payload: IPPStrikeOffStatusUpdateRequest
): Promise<PPStrikeOffStatus> => {
  const result = await prisma.$transaction(async transactionClient => {
    const existingPPStrikeOffStatus =
      await transactionClient.pPStrikeOffStatus.findUnique({
        where: {
          ppStatusId,
          style: {
            styleNo: payload?.styleNo,
          },
        },
      });

    if (!existingPPStrikeOffStatus) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'PP Strike Off Status Not Found!!'
      );
    }

    const updatedFactoryDetails = {
      ppStatusComment: payload?.ppStatusComment,
    };

    const updatedFactory = await transactionClient.pPStrikeOffStatus.update({
      where: {
        ppStatusId,
        style: {
          styleNo: payload?.styleNo,
        },
      },
      data: updatedFactoryDetails,
    });

    return updatedFactory;
  });

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to update PP Strike Off Status'
    );
  }

  return result;
};

export const PPStrikeOffStatusService = {
  createNewPPStrikeOffStatus,
  getAllPPStrikeOffStatus,
  getSinglePPStrikeOffStatus,
  updatePortPPStrikeOffStatus,
};
