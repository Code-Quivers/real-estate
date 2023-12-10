import { BulkProductionStatus, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

import { BulkProductionSearchableFields } from './BulkProductionStatus.constants';
import {
  IBulkStatusCreateRequest,
  IBulkStatusFilterRequest,
  IBulkStatusUpdateRequest,
} from './BulkProductionStatus.interface';

// modules

// !----------------------------------Create New Bulk Production Status---------------------------------------->>>
const createNewPBulkProductionStatus = async (
  profileId: string,
  data: IBulkStatusCreateRequest
): Promise<BulkProductionStatus> => {
  const isExistStyle = await prisma.styles.findUnique({
    where: {
      styleNo: data?.styleNo,
    },
  });
  if (!isExistStyle) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Style Not Found !!');
  }

  const bulkProductionDetails = {
    bulkProductionComment: data?.bulkProductionComment,
    styleNo: data?.styleNo,
    profileId,
  };

  const result = await prisma.bulkProductionStatus.create({
    data: bulkProductionDetails,
    include: {
      style: true,
    },
  });

  return result;
};
// !----------------------------------get all Bulk Production Status---------------------------------------->>>
const getAllBulkProductionStatus = async (
  filters: IBulkStatusFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<BulkProductionStatus[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, startDate, endDate, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.BulkProductionStatusWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: BulkProductionSearchableFields.map((field: any) => ({
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
  const whereConditions: Prisma.BulkProductionStatusWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Bulk Production Status with filtering and pagination
  const result = await prisma.bulkProductionStatus.findMany({
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

  // Count total matching Bulk Production Status for pagination
  const total = await prisma.bulkProductionStatus.count({
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
// !----------------------------------get Single Bulk Production Status---------------------------------------->>>
const getSingleBulkProductionStatus = async (
  bulkProductionId: string
): Promise<BulkProductionStatus | null> => {
  const result = await prisma.bulkProductionStatus.findUnique({
    where: {
      bulkProductionId,
    },
    include: {
      style: true,
      profile: true,
    },
  });

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Bulk Production Status Not Found!!'
    );
  }

  return result;
};
// !----------------------------------Update Bulk Production Status---------------------------------------->>>
const updateBulkProductionStatus = async (
  bulkProductionId: string,
  payload: IBulkStatusUpdateRequest
): Promise<BulkProductionStatus> => {
  const result = await prisma.$transaction(async transactionClient => {
    const bulkProductionStatus =
      await transactionClient.bulkProductionStatus.findUnique({
        where: {
          bulkProductionId,
          style: {
            styleNo: payload?.styleNo,
          },
        },
      });

    if (!bulkProductionStatus) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'Bulk Production Status or Style  Not Found!!'
      );
    }

    const updatedBulkProductionDetails = {
      bulkProductionComment: payload?.bulkProductionComment,
    };

    const updatedBulkStatus =
      await transactionClient.bulkProductionStatus.update({
        where: {
          bulkProductionId,
          style: {
            styleNo: payload?.styleNo,
          },
        },
        data: updatedBulkProductionDetails,
      });

    return updatedBulkStatus;
  });

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to update PP Strike Off Status'
    );
  }

  return result;
};

export const BulkProductionStatusService = {
  createNewPBulkProductionStatus,
  getAllBulkProductionStatus,
  getSingleBulkProductionStatus,
  updateBulkProductionStatus,
};
