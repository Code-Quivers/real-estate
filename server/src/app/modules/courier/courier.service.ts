/* eslint-disable @typescript-eslint/no-explicit-any */
import { Courier, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

import { IStylesFilterRequest } from '../styles/styles.interface';
import {
  CourierSearchableFields,
  StyleWiseCourierSearchableFields,
  courierRelationalFields,
  courierRelationalFieldsMapper,
} from './courier.constants';
import {
  ICourierCreateRequest,
  ICourierFilterRequest,
  ICourierUpdateRequest,
  IStyleWiseCourier,
} from './courier.interface';

// modules

// !----------------------------------Create New Courier---------------------------------------->>>
const createNewCourier = async (
  data: ICourierCreateRequest
): Promise<Courier> => {
  const portDetails = {
    courierName: data.courierName,
    awbNo: data.awbNo,
    courierDate: data.courierDate,
    courierDetails: data.courierDetails,
    courierWeight: data.courierWeight,
    styleNo: data?.styleNo,
  };

  const isStyleExist = await prisma.styles.findUnique({
    where: {
      styleNo: data?.styleNo,
    },
  });
  if (!isStyleExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Style not Found');
  }
  const result = await prisma.courier.create({
    data: portDetails,
  });

  return result;
};
// !----------------------------------get all Courier---------------------------------------->>>
const getAllCouriers = async (
  filters: ICourierFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Courier[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, startDate, endDate, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.CourierWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: CourierSearchableFields.map((field: any) => ({
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
      courierDate: {
        gte: startDate, // Greater than or equal to startDate
        lte: endDate, // Less than or equal to endDate
      },
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (courierRelationalFields.includes(key)) {
          return {
            [courierRelationalFieldsMapper[key]]: {
              styleNo: (filterData as any)[key],
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

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.CourierWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.courier.findMany({
    include: {
      style: true,
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
  const total = await prisma.courier.count({
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

// !----------------------------------get Single Courier---------------------------------------->>>
const getSingleCourier = async (courierId: string): Promise<Courier | null> => {
  const result = await prisma.courier.findUnique({
    where: {
      courierId,
    },
    include: {
      style: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Courier Not Found!!');
  }

  return result;
};
// !----------------------------------Update Courier---------------------------------------->>>
const updateCourierInformation = async (
  courierId: string,
  payload: ICourierUpdateRequest
): Promise<Courier> => {
  const result = await prisma.$transaction(async transactionClient => {
    const existingCourier = await transactionClient.courier.findUnique({
      where: {
        courierId,
      },
    });

    if (!existingCourier) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Courier Not Found!!');
    }

    const updatedCourierDetails = {
      courierName: payload?.courierName,
      awbNo: payload?.awbNo,
      courierDate: payload?.courierDate,
      courierDetails: payload?.courierDetails,
      courierWeight: payload?.courierWeight,
      styleNo: payload?.styleNo,
    };

    const updatedCourier = await transactionClient.courier.update({
      where: {
        courierId,
      },
      data: updatedCourierDetails,
    });

    return updatedCourier;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update Courier');
  }

  return result;
};

const getStyleWiseNoOfCourier = async (
  filters: IStylesFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<IStyleWiseCourier[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.StylesWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: StyleWiseCourierSearchableFields.map((field: any) => ({
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
  const whereConditions: Prisma.StylesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.styles.findMany({
    select: {
      styleNo: true,
      _count: {
        select: {
          couriers: true,
        },
      },
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
  const total = await prisma.styles.count({
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

export const CourierService = {
  createNewCourier,
  getAllCouriers,
  getSingleCourier,
  updateCourierInformation,
  getStyleWiseNoOfCourier,
};
