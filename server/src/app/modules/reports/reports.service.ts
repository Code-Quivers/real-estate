/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { Prisma, Report } from "@prisma/client";
import {
  IAddAnnualTaxDocument,
  IAddMonthlyOrAnnualReport,
  IInformationType,
  IReportFilterRequest,
} from "./reports.interfaces";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { reportsRelationalFields, reportsRelationalFieldsMapper, reportsSearchableFields } from "./reports.constants";
import { IGenericResponse } from "../../../interfaces/common";
import { reportTypePrefix } from "./reports.utils";
import { Request } from "express";
import { IUploadFile } from "../../../interfaces/file";

// ! add report
const addMonthlyOrAnnualReport = async (
  propertyOwnerId: string,
  payload: IAddMonthlyOrAnnualReport,
): Promise<Partial<Report>> => {
  const { propertyId } = payload;
  const res = await prisma.$transaction(async (transactionClient) => {
    const isExistProperty = await transactionClient.property.findUnique({
      where: {
        propertyId,
      },
      include: {
        Tenant: true,
      },
    });

    if (!isExistProperty) {
      throw new ApiError(httpStatus.NOT_FOUND, "Unit not Found !!");
    }

    // making information
    const information: IInformationType[] = [
      {
        image: isExistProperty.images[0],
        monthlyRent: isExistProperty?.monthlyRent,
        numOfBed: isExistProperty.numOfBed,
        numOfBath: isExistProperty.numOfBath,
        address: isExistProperty.address,
        tenantName: `${isExistProperty.Tenant?.firstName} ${isExistProperty.Tenant?.lastName}`,
        tenantPhoto: isExistProperty.Tenant?.profileImage,
        propertyId,
      },
    ];
    //  rent collected - expenses
    const creatingData = {
      reportTitle: `${reportTypePrefix(payload.reportType)} Property Statement - Property ${isExistProperty.title}`,
      rentAmount: isExistProperty.monthlyRent,
      information,
      collectedRent: payload.collectedRent,
      expenses: payload.expenses,
      reportType: payload.reportType,
      grossProfit: payload.collectedRent - payload.expenses,
      propertyOwnerId,
      propertyId,
    };

    const result = await transactionClient.report.create({
      data: creatingData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to add Report");
    }
    return result;
  });
  return res;
};
// ! add annual tax document report
const addAnnualTaxDocument = async (propertyOwnerId: string, req: Request): Promise<Partial<Report>> => {
  const file = req.file as IUploadFile;
  const filePath = file?.path?.substring(13);
  const { reportType } = req.body as IAddAnnualTaxDocument;

  const res = await prisma.$transaction(async (transactionClient) => {
    // checking if already exist report on same year

    // const startOfYear = moment().startOf("year");
    // const endOfYear = moment().endOf("year");

    // const isExistReportThisMonth = await transactionClient.report.findFirst({
    //   where: {
    //     propertyOwnerId,
    //     reportType,
    //     createdAt: { gte: startOfYear.toDate(), lte: endOfYear.toDate() },
    //   },
    // });

    // if (isExistReportThisMonth) {
    //   throw new ApiError(httpStatus.CONFLICT, "A Report already exists for the Current Year.");
    // }

    const creatingData = {
      reportTitle: `Annual Tax Document`,
      reportType,
      documentFile: filePath,
      propertyOwnerId,
    };

    const result = await transactionClient.report.create({
      data: creatingData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to add Report");
    }
    return result;
  });
  return res;
};
// ! generate report
const generateTenantInfoReport = async (propertyOwnerId: string): Promise<Partial<Report>> => {
  const res = await prisma.$transaction(async (transactionClient) => {
    const isExistProperty = await transactionClient.property.findMany({
      where: {
        ownerId: propertyOwnerId,
        Tenant: {
          isNot: null,
        },
      },
      include: {
        Tenant: true,
      },
    });

    if (!isExistProperty?.length) {
      throw new ApiError(httpStatus.NOT_FOUND, "No Unit Found !!");
    }

    // making information
    // Initialize an array to store information
    const information = [];

    // Loop through each property and generate information
    for (const property of isExistProperty) {
      const propertyInformation = {
        image: property.images[0],
        monthlyRent: property.monthlyRent,
        numOfBed: property.numOfBed,
        numOfBath: property.numOfBath,
        address: property.address,
        tenantName: `${property.Tenant?.firstName} ${property.Tenant?.lastName}`,
        tenantPhoto: property.Tenant?.profileImage,
      };
      information.push(propertyInformation);
    }

    //  rent collected - expenses
    const creatingData = {
      reportTitle: `Tenant Information`,
      propertyOwnerId,
      information,
    };

    const result = await transactionClient.report.create({
      data: { ...creatingData, reportType: "TENANT_INFO" },
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to add Report");
    }
    return result;
  });
  return res;
};

// ! get reports
const getPropertyOwnerReports = async (
  filters: IReportFilterRequest,
  options: IPaginationOptions,
  propertyOwnerId: string,
): Promise<IGenericResponse<Report[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  //
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: reportsSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  //
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (reportsRelationalFields.includes(key)) {
          return {
            [reportsRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.ReportWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  //
  const result = await prisma.$transaction(async (transactionClient) => {
    const allChats = await transactionClient.report.findMany({
      where: {
        ...whereConditions,
        propertyOwnerId,
      },
      skip,

      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
              updatedAt: "desc",
            },
    });

    const total = await transactionClient.report.count({
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
      data: allChats,
    };
  });

  return result;
};

// ! createOrUpdateService
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const getReportDetails = async (reportId: string, propertyOwnerId: string): Promise<Report> => {
  const result = await prisma.$transaction(async (transactionClient) => {
    //
    const reportDetails = await transactionClient.report.findUnique({
      where: {
        propertyOwnerId,
        reportId,
      },
    });
    if (!reportDetails) {
      throw new ApiError(httpStatus.NOT_FOUND, "Report not found !");
    }
    return reportDetails;
  });
  return result;
};

export const ReportsService = {
  addMonthlyOrAnnualReport,
  addAnnualTaxDocument,
  generateTenantInfoReport,
  getPropertyOwnerReports,
  getReportDetails,
};
