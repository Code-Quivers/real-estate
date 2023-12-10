/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Orders, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

import {
  ordersRelationalFields,
  ordersRelationalFieldsMapper,
  ordersSearchableFields,
} from './orders.constants';
import {
  ICreateOrderResponse,
  IOrderCreateRequest,
  IOrderFilterRequest,
  IOrderUpdateRequest,
} from './orders.interface';

// modules

// !----------------------------------Create New Order---------------------------------------->>>
const createNewOrder = async (
  profileId: string,
  data: IOrderCreateRequest
): Promise<ICreateOrderResponse> => {
  const existingOrder = await prisma.orders.findUnique({
    where: {
      orderNo: data.orderNo,
    },
    select: {
      orderNo: true,
    },
  });

  if (existingOrder) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'PO number is already used !!');
  }

  const existingStyle = await prisma.styles.findUnique({
    where: {
      styleNo: data.styleNo,
    },
    select: {
      styleNo: true,
    },
  });

  if (!existingStyle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Style does not Exist');
  }
  const existingPort = await prisma.port.findUnique({
    where: {
      portId: data.portId,
    },
    select: {
      portId: true,
    },
  });

  if (!existingPort) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Port does not Exist');
  }

  // Calculate total pieces (totalPc)
  const totalPc = data?.noOfPack * data?.totalPack;

  //! Create the new order
  const result = await prisma.orders.create({
    data: {
      ...data,
      totalPc,
      profileId,
    },
    select: {
      createdAt: true,
      orderNo: true,
      styleNo: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order creation failed');
  }

  return result;
};
// !----------------------------------get all orders---------------------------------------->>>
const getAllOrders = async (
  filters: IOrderFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Orders[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const {
    searchTerm,
    startDate,
    endDate,

    ...filterData
  } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.OrdersWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: ordersSearchableFields.map(field => ({
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
      if (ordersRelationalFields.includes(key)) {
        return {
          [ordersRelationalFieldsMapper[key]]: {
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
    });
    andConditions.push({ AND: filterConditions });
  }

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.OrdersWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve orders with filtering and pagination
  const result = await prisma.orders.findMany({
    include: {
      profile: {
        select: {
          profileId: true,
          firstName: true,
          lastName: true,
          role: true,
          profileImage: true,
        },
      },
      style: true,
      Port: true,
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
  const total = await prisma.orders.count({
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
// !----------------------------------get Single order---------------------------------------->>>
const getSingleOrder = async (orderNo: string): Promise<Orders | null> => {
  const result = await prisma.orders.findUnique({
    where: {
      orderNo,
    },
    include: {
      profile: {
        select: {
          profileId: true,
          firstName: true,
          lastName: true,
          role: true,
          profileImage: true,
        },
      },
      style: true,
      Port: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order Not Found!!');
  }

  return result;
};
// !----------------------------------Update Order---------------------------------------->>>
const updateOrder = async (
  orderNo: string,
  payload: IOrderUpdateRequest
): Promise<Orders> => {
  const result = await prisma.$transaction(async transactionClient => {
    let totalPc: number | undefined = undefined;

    const existingOrder = await transactionClient.orders.findUnique({
      where: {
        orderNo,
      },
    });

    if (!existingOrder) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Order Not Found!!');
    }

    if (payload.noOfPack !== undefined || payload.totalPack !== undefined) {
      totalPc =
        (payload.noOfPack !== undefined
          ? payload.noOfPack
          : existingOrder.noOfPack) *
        (payload.totalPack !== undefined
          ? payload.totalPack
          : existingOrder.totalPack);
    }

    if (payload.styleNo) {
      const isExistStyle = await transactionClient.styles.findFirst({
        where: {
          styleNo: payload.styleNo,
        },
      });

      if (!isExistStyle) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Style Not Found!!');
      }
    }

    const updatedOrder = await transactionClient.orders.update({
      where: {
        orderNo,
      },
      data: {
        ...payload,
        totalPc,
      },
      include: {
        style: true,
      },
    });

    return updatedOrder;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update order');
  }

  return result;
};

// ! style  wise order list

const styleWiseOrderLists = async (
  filters: IOrderFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<any[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const {
    searchTerm,
    startDate,
    endDate,
    friStartDate,
    friEndDate,
    factoryId,
    ...filterData
  } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.OrdersWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: ordersSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (factoryId) {
    andConditions.push({
      style: {
        factoryId: {
          contains: factoryId,
          mode: 'insensitive',
        },
      },
    });
  }

  // Add date range condition if both startDate and endDate are provided
  if (startDate && endDate) {
    andConditions.push({
      buyerEtd: {
        gte: startDate, // Greater than or equal to startDate
        lte: endDate, // Less than or equal to endDate
      },
    });
  }

  if (friStartDate && friEndDate) {
    andConditions.push({
      friDate: {
        gte: friStartDate,
        lte: friEndDate,
      },
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map(key => {
      if (ordersRelationalFields.includes(key)) {
        return {
          [ordersRelationalFieldsMapper[key]]: {
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
    });
    andConditions.push({ AND: filterConditions });
  }

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.OrdersWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve orders with filtering and pagination
  const result = await prisma.orders.findMany({
    where: whereConditions,
    include: {
      Port: true,
      style: {
        select: {
          factory: true,
        },
      },
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  const ordersByStyleNo: {
    [styleNo: string]: { orders: Orders[]; factory?: any };
  } = {};

  // Iterate through the result and organize orders by styleNo
  result.forEach(order => {
    const { styleNo, style } = order;

    if (!ordersByStyleNo[styleNo]) {
      ordersByStyleNo[styleNo] = { orders: [], factory: style?.factory };
    }

    ordersByStyleNo[styleNo].orders.push(order);
  });

  const styleWiseOrders = Object.keys(ordersByStyleNo).map(styleNo => ({
    styleNo,
    factory: ordersByStyleNo[styleNo].factory,
    orders: ordersByStyleNo[styleNo].orders,
  }));

  const total = await prisma.orders.count({
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
    data: styleWiseOrders,
  };
};

// !----------------------------------get all orders---------------------------------------->>>

// const getAllOrdersLength = async (): Promise<{
//   total: number | null;
//   currentYear: number | null;
//   lastYear: number | null;
// }> => {
//   const currentDate = new Date();
//   const currentYear = currentDate.getFullYear();
//   const oneYearAgo = new Date(currentYear - 1, 0, 1); // January 1st of the previous year
//   const lastDayOfLastYear = new Date(currentYear - 1, 11, 31); // December 31st of the previous year

//   // Use Prisma to count all-time orders
//   const total = await prisma.orders.count();

//   // Use Prisma to count orders created within the current year
//   const currentYearCount = await prisma.orders.count({
//     where: {
//       createdAt: {
//         gte: new Date(currentYear, 0, 1), // January 1st of the current year
//         lte: currentDate,
//       },
//     },
//   });

//   // Use Prisma to count orders created within the last year
//   const lastYearCount = await prisma.orders.count({
//     where: {
//       createdAt: {
//         gte: oneYearAgo,
//         lte: lastDayOfLastYear,
//       },
//     },
//   });

//   return { total, currentYear: currentYearCount, lastYear: lastYearCount };
// };

const getAllOrdersLength = async (): Promise<{
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
  const total = await prisma.orders.count();

  // Use Prisma to count orders created within the current fiscal year
  const currentYearCount = await prisma.orders.count({
    where: {
      createdAt: {
        gt: fiscalYearStartDate,
        lt: currentDate,
      },
    },
  });

  // Use Prisma to count orders created within the last fiscal year
  const lastYearCount = await prisma.orders.count({
    where: {
      createdAt: {
        gte: new Date(fiscalYear - 1, 3, 1), // April 1st of the last fiscal year
        lte: new Date(fiscalYear, 2, 31), // March 31st of the last fiscal year
      },
    },
  });

  return { total, currentYear: currentYearCount, lastYear: lastYearCount };
};

// !----------------------------------get all orders Buyer ETD ---------------------------------------->>>
// Create a Prisma client instance

const getBuyerEtdStatistics = async () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const nextYear = currentYear + 1;
  const lastYear = currentYear - 1;
  const yearBeforeLast = lastYear - 1;

  // You can calculate the range of years dynamically based on your data
  const startYear = yearBeforeLast;
  const endYear = nextYear;

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const months = [
    {
      monthName: 'April',
      monthIdx: 3,
    },
    {
      monthName: 'May',
      monthIdx: 4,
    },
    {
      monthName: 'June',
      monthIdx: 5,
    },
    {
      monthName: 'July',
      monthIdx: 6,
    },
    {
      monthName: 'August',
      monthIdx: 7,
    },
    {
      monthName: 'September',
      monthIdx: 8,
    },
    {
      monthName: 'October',
      monthIdx: 9,
    },
    {
      monthName: 'November',
      monthIdx: 10,
    },
    {
      monthName: 'December',
      monthIdx: 11,
    },
    {
      monthName: 'January',
      monthIdx: 0,
    },
    {
      monthName: 'February',
      monthIdx: 1,
    },
    {
      monthName: 'March',
      monthIdx: 2,
    },
  ];

  const countOrdersForMonth = async (year: any, month: any) => {
    const startOfMonth = new Date(year, month.monthIdx, 1);
    const endOfMonth = new Date(year, month.monthIdx + 1, 0);

    const count = await prisma.orders.count({
      where: {
        buyerEtd: {
          gt: startOfMonth,
          lt: endOfMonth,
        },
      },
    });

    return {
      month,
      count,
    };
  };

  const yearCounts = await Promise.all(
    years.map(year =>
      Promise.all(months.map(month => countOrdersForMonth(year, month)))
    )
  );

  const yearData = years.map((year, index) => ({
    year: year,
    total: yearCounts[index].reduce((acc, cur) => acc + cur.count, 0),
    monthlyCounts: yearCounts[index],
  }));

  return yearData;
};

getBuyerEtdStatistics()
  .then(() => {
    //
    // console.log(results);
  })
  .finally(async () => {
    await prisma.$disconnect(); // Disconnect from the Prisma client
  });

const getAprilToSeptSeasonOrdersPC = async (year: number): Promise<number> => {
  // Start from April 1
  const seasonStart = new Date(year, 3, 1);

  // End on September 30
  const seasonEnd = new Date(year, 8, 30);

  const ordersTotalPc = await prisma.orders.aggregate({
    where: {
      buyerEtd: {
        gte: seasonStart,
        lt: seasonEnd,
      },
    },
    _sum: {
      totalPc: true,
    },
  });

  return ordersTotalPc._sum.totalPc || 0;
};

const getOctToMarchSeasonOrdersPC = async (year: number): Promise<number> => {
  // Start from October 1, 12:01 AM
  const seasonStart = new Date(year, 9, 1, 0, 0);

  // End on March 30, 12:00 AM
  const seasonEnd = new Date(year + 1, 2, 31, 0, 0);

  const ordersTotalPc = await prisma.orders.aggregate({
    where: {
      buyerEtd: {
        gte: seasonStart,
        lt: seasonEnd,
      },
    },
    _sum: {
      totalPc: true,
    },
  });

  return ordersTotalPc._sum.totalPc || 0;
};

const getAllOrdersPC = async () => {
  const seasonsData = [];
  const currentYear = new Date().getFullYear();

  for (let year = currentYear - 2; year <= currentYear + 1; year++) {
    // Updated the loop range to include 2024
    const aprilToSept = await getAprilToSeptSeasonOrdersPC(year); // April to September
    const octToMarch = await getOctToMarchSeasonOrdersPC(year); // October to March

    seasonsData.push({
      year,
      aprilToSept,
      octToMarch,
      total: aprilToSept + octToMarch,
    });
  }

  return seasonsData;
};

export const OrderService = {
  createNewOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  styleWiseOrderLists,
  getAllOrdersLength,
  getBuyerEtdStatistics,
  getAllOrdersPC,
};
