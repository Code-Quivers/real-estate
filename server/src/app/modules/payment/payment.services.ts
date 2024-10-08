/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";

import { PaymentInformation, Prisma } from "@prisma/client";

import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IPaymentFilterRequest } from "./payment.interface";
import { PaymentRelationalFields, PaymentRelationalFieldsMapper, PaymentSearchableFields } from "./payment.constant";

/**
 * Retrieves all payment report.
 * @returns A Promise resolving to an array of PaymentInformation objects or null.
 */
// const getPaymentReports = async (): Promise<PaymentInformation[] | null> => {
//   // Fetch payment reports from the database for the given user ID
//   const paymentReports = await prisma.paymentInformation.findMany({});

//   // If no payment reports are found, throw an error
//   if (!paymentReports) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'No payment information found!!!');
//   }

//   return paymentReports;
// };

const getPaymentReports = async (
  filters: IPaymentFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<PaymentInformation[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.PaymentInformationWhereInput[] = [];

  // Add search term condition if provided

  //   if (searchTerm) {
  //     andConditions.push({
  //       OR: PaymentSearchableFields.map((field: any) => ({
  //         [field]: {
  //           contains: searchTerm,
  //           mode: 'insensitive',
  //         },
  //       })),
  //     });
  //   }

  if (searchTerm) {
    andConditions.push({
      OR: [
        ...PaymentSearchableFields.map((field: string) => ({
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        })),
        // Include search in nested field 'partyOrderId'
        // {
        //   order: {
        //     partyOrderId: {
        //       contains: searchTerm,
        //       mode: 'insensitive',
        //     },
        //   },
        // },
        // {
        //   user: {
        //     email: {
        //       contains: searchTerm,
        //       mode: 'insensitive',
        //     },
        //   },
        // },
      ],
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (PaymentRelationalFields.includes(key)) {
          return {
            [PaymentRelationalFieldsMapper[key]]: {
              subCategoryName: (filterData as any)[key],
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
  const whereConditions: Prisma.PaymentInformationWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.paymentInformation.findMany({
    include: {
      order: true,
      user: {
        include: {
          propertyOwner: true,
          tenant: true,
        },
      },
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { updatedAt: "desc" },
  });

  // Count total matching orders for pagination
  const total = await prisma.paymentInformation.count({
    where: whereConditions,
  });

  // Calculate total pages
  const totalPage = limit > 0 ? Math.ceil(total / limit) : 0;

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

/**
 * Retrieves a single payment report based on the payment ID.
 * @param paymentId The ID of the payment report to retrieve.
 * @returns A Promise resolving to a PaymentInformation object or null.
 */
const getPaymentReport = async (paymentId: string): Promise<PaymentInformation | null> => {
  // Fetch a single payment report from the database based on the payment ID
  const paymentReport = await prisma.paymentInformation.findUnique({
    where: {
      id: paymentId,
    },
  });

  // If the payment report is not found, throw an error
  if (!paymentReport) {
    throw new ApiError(httpStatus.NOT_FOUND, "No payment information found!!!");
  }

  return paymentReport;
};

const getPaymentReportsWithOrderId = async (userId: string, orderId: string): Promise<PaymentInformation[] | null> => {
  // Fetch a single payment report from the database based on the payment ID
  const paymentReports = await prisma.paymentInformation.findMany({
    where: {
      orderId: orderId,
      userId: userId,
    },
  });

  // If the payment report is not found, throw an error
  if (!paymentReports) {
    throw new ApiError(httpStatus.NOT_FOUND, "No payment information found!!!");
  }

  return paymentReports;
};

// Store payment information in the database from the plaform like Paypal, venmo etc.

const createPaymnentReport = async (data: any): Promise<PaymentInformation | null> => {
  // Fetch a single payment report from the database based on the payment ID
  const paymentReport = await prisma.paymentInformation.create({
    data: data,
  });

  // If the payment report is not found, throw an error
  if (!paymentReport) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No payment information found!!!");
  }

  return paymentReport;
};

// Exporting PaymentServices object with methods
export const PaymentServices = {
  getPaymentReports,
  getPaymentReport,
  getPaymentReportsWithOrderId,
  createPaymnentReport,
};
