import httpStatus from "http-status";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { Prisma } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
<<<<<<< HEAD
<<<<<<< HEAD
// import { ISavedItem } from "./savedItem.interfaces";
=======
import { ISavedItem } from "./savedItem.interfaces";
import { isEmptyObject } from "../../../helpers/utils";
>>>>>>> 5544faa6ca0b6e4d1dbac7797bda9889bb9a69ae
=======
import { ISavedItem } from "./savedItem.interfaces";
import { isEmptyObject } from "../../../helpers/utils";
>>>>>>> 26643d1011163c529f23529b7af5a8de461a8739


<<<<<<< HEAD
<<<<<<< HEAD
  const result = await prisma.$transaction(async (transactionClient) => {
    console.log(data);
    const savedItem = await transactionClient.savedItem.create({
      data: data,
      include: {
        user: true,
      },
    });
    if (!savedItem) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Item saving failed!!!");
    }
    return savedItem;
  });
  return result;
};

const getSavedTenants = async (userId: string, filters: any, options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const whereConditions: Prisma.SavedItemWhereInput = {
    AND: [
      {
        userId: userId,
        itemType: "TENANT",
      },
      {
        tenant: {
          OR: [
            {
              firstName: {
                contains: filters.name,
              },
              presentAddress: {
                contains: filters.address,
              },
              affordableRentAmount: {
                gte: filters.rent,
              },
            },
            {
              lastName: {
                contains: filters.name,
              },
              presentAddress: {
                contains: filters.address,
              },
              affordableRentAmount: {
                gte: filters.rent,
              },
            },
          ],
        },
      },
    ],
  };
  //
  const result = await prisma.$transaction(async (transactionClient) => {
    const savedItems = await transactionClient.savedItem.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
              createdAt: "desc",
=======
=======
>>>>>>> 26643d1011163c529f23529b7af5a8de461a8739
const createSavedItem = async (data: ISavedItem) => {
    // saved the item to the SavedItem model.

    const result = await prisma.$transaction(async (transactionClient) => {
        const savedItem = await transactionClient.savedItem.create({
            data: data,
            include: {
                user: true,
            }
        });
        if (!savedItem) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Item saving failed!!!");
        }
        return savedItem
    })
    return result;
}

// Remove Saved Item
const removeSavedItem = async (itemId: string) => {
    const result = await prisma.$transaction(async (transactionClient) => {
        const removedItem = await transactionClient.savedItem.delete({
            where: {
                itemId: itemId
            }
        })
        if (!removedItem) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Item saving failed!!!");
        }
        return removedItem
    })
    return result;
}

const getSavedTenants = async (userId: string, filters: any, options: IPaginationOptions) => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { name, address, rent } = filters;
    const orCondition: any[] = [];
    if (name) {
        orCondition.push({ firstName: { contains: name } })
        orCondition.push({ lastName: { contains: name } })
    }
    const tenantFilteringCondition: any = {}
    if (orCondition.length == 2) {
        tenantFilteringCondition.OR = orCondition
    }
    if (address) {
        tenantFilteringCondition.presentAddress = { contains: filters.address };
    }
    if (rent) {
        tenantFilteringCondition.affordableRentAmount = { gte: filters.rent };
    }

    const whereConditions: Prisma.SavedItemWhereInput = {
        AND: [
            { userId, itemType: "TENANT" },
            ...(!isEmptyObject(tenantFilteringCondition) ? [{ tenant: tenantFilteringCondition }] : []),
        ],
    };

    //
    const result = await prisma.$transaction(async (transactionClient) => {
        const savedItems = await transactionClient.savedItem.findMany({
            where: whereConditions,
            skip,
            take: limit,
            orderBy:
                options.sortBy && options.sortOrder
                    ? { [options.sortBy]: options.sortOrder }
                    : {
                        createdAt: "desc",
                    },
            include: {
                tenant: true,
            }
        });

        const total = await prisma.savedItem.count({
            where: whereConditions,
        });
        const totalPage = Math.ceil(total / limit);

        if (!savedItems) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Failed to retive saved items!!!");
        }
        
        return {
            meta: {
                page,
                limit,
                total,
                totalPage,
<<<<<<< HEAD
>>>>>>> 5544faa6ca0b6e4d1dbac7797bda9889bb9a69ae
            },
      include: {
        tenant: true,
      },
    });

    const total = await prisma.savedItem.count({
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
      data: savedItems,
    };
  });

  return result;
};

const getAllPropertyOwners = async (filters: IPropertyOwnerFilterRequest, options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: propertyOwnerSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (propertyOwnerRelationalFields.includes(key)) {
          return {
            [propertyOwnerRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.PropertyOwnerWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};
  //
  const result = await prisma.$transaction(async (transactionClient) => {
    const allPropertyOwner = await transactionClient.propertyOwner.findMany({
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
      where: whereConditions,
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
              createdAt: "desc",
=======
>>>>>>> 26643d1011163c529f23529b7af5a8de461a8739
            },
    });

    const total = await prisma.propertyOwner.count({
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
      data: allPropertyOwner,
    };
  });

  return result;
};



// Get the saved Service Providers
const getSavedServiceProviders = async (userId: string, filters: any, options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const whereConditions: Prisma.SavedItemWhereInput = {
    AND: [
      {
        userId: userId,
        itemType: "SERVICE",
      },
      {
        serviceProvider: {
          OR: [
            {
              firstName: {
                contains: filters.name,
              },
              Service: {
                serviceType: filters.serviceType,
                serviceAvailability: filters.priority,
                minPrice: {
                  gte: filters.price,
                },
                maxPrice: { lte: filters.price },
              },
            },
            {
              lastName: {
                contains: filters.name,
              },
              Service: {
                serviceType: filters.serviceType,
                serviceAvailability: filters.priority,
                minPrice: {
                  gte: filters.price,
                },
                maxPrice: { lte: filters.price },
              },
            },
          ],
        },
      },
    ],
  };
  //
  const result = await prisma.$transaction(async (transactionClient) => {
    const savedItems = await transactionClient.savedItem.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
              createdAt: "desc",
            },
      include: {
        serviceProvider: true,
      },
    });

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 26643d1011163c529f23529b7af5a8de461a8739
    const total = await prisma.savedItem.count({
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
      data: savedItems,
    };
  });

  return result;
};
export const SavedItemServices = {
<<<<<<< HEAD
  getSavedTenants,
  getSavedServiceProviders,
  createSavedItem,
  getAllPropertyOwners
=======
    return result;
}
export const SavedItemServices = {
=======
>>>>>>> 26643d1011163c529f23529b7af5a8de461a8739
    getSavedTenants,
    getSavedServiceProviders,
    createSavedItem,
    removeSavedItem
<<<<<<< HEAD
>>>>>>> 5544faa6ca0b6e4d1dbac7797bda9889bb9a69ae
=======
>>>>>>> 26643d1011163c529f23529b7af5a8de461a8739
};
