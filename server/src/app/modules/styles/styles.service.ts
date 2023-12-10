/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Styles } from '@prisma/client';
import { Request } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IUploadFile } from '../../../interfaces/file';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  stylesRelationalFields,
  stylesRelationalFieldsMapper,
  stylesSearchableFields,
} from './styles.constants';
import {
  IAssignedStyleResponse,
  IFactoryAssignToStyleResponse,
  IGetAllStyleNo,
  IStyleCreateRequest,
  IStyleUpdateRequest,
  IStylesFilterRequest,
} from './styles.interface';

// modules

// const createNewStyle = async (
//   profileId: string,
//   req: Request
// ): Promise<Styles> => {
//   const file = req.file as IUploadFile;
//   const uploadedImage = await FileUploadHelper.uploadStyleImageToCloudinary(
//     file
//   );

//   if (uploadedImage) {
//     req.body.image = uploadedImage.secure_url;
//   }
//   const data = req.body as IStyleCreateRequest;

//   const result = await prisma.$transaction(async transactionClient => {
//     const isExistStyleNo = await prisma.styles.findUnique({
//       where: {
//         styleNo: data.styleNo,
//       },
//     });
//     if (isExistStyleNo) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Style No is already added');
//     }

//     const isExistItem = await prisma.item.findUnique({
//       where: {
//         itemId: data?.itemId,
//       },
//     });
//     if (!isExistItem) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Item Not Found');
//     }

//     const newStyleData = {
//       styleNo: data.styleNo,
//       itemId: data.itemId,
//       image: data?.image,
//       fabric: data.fabric,
//       profileId,
//     };
//     const createdStyle = await transactionClient.styles.create({
//       data: newStyleData,
//       include: {
//         profile: true,
//       },
//     });
//     return createdStyle;
//   });
//   if (!result) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Style creation failed');
//   }
//   return result;
// };
const createNewStyle = async (
  profileId: string,
  payload: IStyleCreateRequest
): Promise<Styles> => {
  const result = await prisma.$transaction(async transactionClient => {
    const isExistStyleNo = await prisma.styles.findUnique({
      where: {
        styleNo: payload.styleNo,
      },
    });
    if (isExistStyleNo) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Style No is already added');
    }

    const isExistItem = await prisma.item.findUnique({
      where: {
        itemId: payload?.itemId,
      },
    });
    if (!isExistItem) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Item Not Found');
    }

    const newStyleData = {
      styleNo: payload.styleNo,
      itemId: payload.itemId,
      image: payload.image,
      fabric: payload.fabric,
      profileId,
    };
    const createdStyle = await transactionClient.styles.create({
      data: newStyleData,
      include: {
        profile: true,
      },
    });
    return createdStyle;
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Style creation failed');
  }
  return result;
};

const getAllStyles = async (
  filters: IStylesFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Styles[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, startDate, endDate, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: stylesSearchableFields.map((field: any) => ({
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
      orders: {
        some: {
          buyerEtd: {
            gte: startDate,
          },
          AND: {
            buyerEtd: {
              lte: endDate,
            },
          },
        },
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (stylesRelationalFields.includes(key)) {
          return {
            [stylesRelationalFieldsMapper[key]]: {
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

  // @ts-ignore
  const whereConditions: Prisma.StylesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.styles.findMany({
    include: {
      profile: true,
      orders: true,
      factory: true,
      BulkProductionStatus: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          profile: {
            select: {
              firstName: true,
              lastName: true,
              profileId: true,
              profileImage: true,
              role: true,
            },
          },
        },
      },
      PPStrikeOffStatus: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          profile: {
            select: {
              firstName: true,
              lastName: true,
              profileId: true,
              profileImage: true,
              role: true,
            },
          },
        },
      },
      ldCpAopStatus: {
        include: {
          profile: {
            select: {
              firstName: true,
              lastName: true,
              profileId: true,
              profileImage: true,
              role: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      PPSubmission: true,
      tackPack: {
        include: {
          profile: {
            select: {
              firstName: true,
              lastName: true,
              profileId: true,
              profileImage: true,
              role: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      couriers: true,
      item: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.styles.count({
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
    data: result,
  };
};

const getAllStyleNumbers = async (
  filters: IStylesFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<IGetAllStyleNo[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, startDate, endDate, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: stylesSearchableFields.map((field: any) => ({
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

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (stylesRelationalFields.includes(key)) {
          return {
            [stylesRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.StylesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.styles.findMany({
    select: {
      styleNo: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.styles.count({
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
    data: result,
  };
};

const getSingleStyle = async (styleNo: string): Promise<Styles | null> => {
  //

  const result = await prisma.styles.findUnique({
    where: {
      styleNo,
    },
    include: {
      profile: true,
      orders: true,
      BulkProductionStatus: {
        include: {
          profile: true,
        },
      },
      PPStrikeOffStatus: {
        include: {
          profile: true,
        },
      },
      couriers: true,
      factory: true,
      item: true,
      ldCpAopStatus: true,
      PPSubmission: true,
      tackPack: true,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Style Not Found !!!');
  }
  return result;
};

// ! update style ----------------------
const updateStyleInformation = async (
  styleNo: string,
  // payload: Partial<IUpdateStyleRequest>
  req: Request
): Promise<Styles | null> => {
  const file = req.file as IUploadFile;
  if (file) {
    const uploadedImage = await FileUploadHelper.uploadStyleImageToCloudinary(
      file
    );

    if (uploadedImage) {
      req.body.image = uploadedImage?.secure_url;
    }
  }

  const data = req.body as IStyleUpdateRequest;

  const isExistStyle = await prisma.styles.findUnique({
    where: {
      styleNo,
    },
  });
  if (!isExistStyle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Style Not Found !!!');
  }

  if (data?.factoryId) {
    const isFactoryExist = await prisma.factory.findUnique({
      where: {
        factoryId: data?.factoryId,
      },
    });
    if (!isFactoryExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Factory Not Found !!!');
    }
  }
  if (data?.itemId) {
    const isExistItem = await prisma.item.findUnique({
      where: {
        itemId: data?.itemId,
      },
    });

    if (!isExistItem) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Item Not Found');
    }
    if (isExistItem) {
      data.itemId = isExistItem.itemId;
    }
  }

  const updateStyleData = {
    itemId: data?.itemId,
    image: data?.image,
    fabric: data?.fabric,
    isActiveStyle: data?.isActiveStyle,
    factoryId: data?.factoryId,
  };

  const result = await prisma.styles.update({
    where: {
      styleNo,
    },
    data: updateStyleData,
    include: {
      factory: true,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Style Updating Failed !!!');
  }
  return result;
};

// ! factory style assign
const factoryStyleAssign = async (
  data: IFactoryAssignToStyleResponse
): Promise<IAssignedStyleResponse> => {
  let assignedResult = null;
  await prisma.$transaction(async transactionClient => {
    const isExistStyleNo = await prisma.styles.findUnique({
      where: {
        styleNo: data?.styleNo,
      },
      select: {
        styleNo: true,
        factoryId: true,
      },
    });
    if (!isExistStyleNo) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Style not Found');
    }
    const isExistFactory = await prisma.factory.findUnique({
      where: {
        factoryId: data?.factoryId,
      },
      select: {
        factoryId: true,
      },
    });
    if (!isExistFactory) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Factory Not Found');
    }

    // check if already exist

    if (isExistStyleNo?.factoryId === isExistFactory?.factoryId) {
      throw new ApiError(httpStatus.CONFLICT, 'Factory Already Assigned');
    }

    const assignedStyle = await transactionClient.styles.update({
      where: {
        styleNo: data.styleNo,
      },
      data: {
        factory: {
          connect: {
            factoryId: data?.factoryId,
          },
        },
      },
      select: {
        styleNo: true,
        factory: true,
      },
    });

    if (!assignedStyle) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Factory Assign failed');
    }

    assignedResult = assignedStyle;
    return assignedStyle;
  });
  if (!assignedResult) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Factory Assign failed');
  }
  return assignedResult;
};
// !getAllStylesRecentComments
const getAllStylesRecentComments = async (): Promise<any> => {
  const styles = await prisma.styles.findMany({
    select: {
      styleNo: true,
      image: true,
      item: {
        select: {
          itemName: true,
        },
      },
      factory: {
        select: {
          factoryName: true,
        },
      },
      BulkProductionStatus: {
        include: {
          profile: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
      ldCpAopStatus: {
        include: {
          profile: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
      PPStrikeOffStatus: {
        include: {
          profile: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
    },
    take: 20,
  });

  // Sort the Styles based on the most recent status across all categories
  styles.sort((a, b) => {
    const aStatus = [
      a?.BulkProductionStatus[0],
      a?.ldCpAopStatus[0],
      a?.PPStrikeOffStatus[0],
    ]?.filter(Boolean);

    const bStatus = [
      b?.BulkProductionStatus[0],
      b?.ldCpAopStatus[0],
      b?.PPStrikeOffStatus[0],
    ].filter(Boolean);

    if (aStatus?.length === 0) return 1;
    if (bStatus?.length === 0) return -1;

    const mostRecentA = aStatus?.reduce((prev, current) =>
      prev?.createdAt > current.createdAt ? prev : current
    );
    const mostRecentB = bStatus?.reduce((prev, current) =>
      prev?.createdAt > current?.createdAt ? prev : current
    );

    return mostRecentB?.createdAt.getTime() - mostRecentA?.createdAt?.getTime();
  });

  return styles;
};

// !----------------------------------get all Stylish---------------------------------------->>>

const getAllStylishLength = async (): Promise<{
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
  const total = await prisma.styles.count();

  // Use Prisma to count orders created within the current fiscal year
  const currentYearCount = await prisma.styles.count({
    where: {
      createdAt: {
        gt: fiscalYearStartDate,
        lt: currentDate,
      },
    },
  });

  // Use Prisma to count orders created within the last fiscal year
  const lastYearCount = await prisma.styles.count({
    where: {
      createdAt: {
        gte: new Date(fiscalYear - 1, 3, 1), // April 1st of the last fiscal year
        lte: new Date(fiscalYear, 2, 31), // March 31st of the last fiscal year
      },
    },
  });

  return { total, currentYear: currentYearCount, lastYear: lastYearCount };
};

export const StylesService = {
  createNewStyle,
  getAllStyles,
  getSingleStyle,
  updateStyleInformation,
  getAllStyleNumbers,
  factoryStyleAssign,
  getAllStylishLength,
  getAllStylesRecentComments,
};
