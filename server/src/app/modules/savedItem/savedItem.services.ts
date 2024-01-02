import httpStatus from "http-status";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { Prisma } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import { ISavedItem } from "./savedItem.interfaces";


const createSavedItem = async (data: ISavedItem) => {
    // saved the item to the SavedItem model.

    const result = await prisma.$transaction(async (transactionClient) => {
        console.log(data)
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

    const whereConditions: Prisma.SavedItemWhereInput = {
        AND: [
            {
                userId: userId,
                itemType: "TENANT"
            },
            {
                tenant: {
                    OR: [
                        {
                            firstName: {
                                contains: filters.name
                            },
                            presentAddress: {
                                contains: filters.address
                            },
                            affordableRentAmount: {
                                gte: filters.rent
                            }
                        },
                        {
                            lastName: {
                                contains: filters.name
                            },
                            presentAddress: {
                                contains: filters.address
                            },
                            affordableRentAmount: {
                                gte: filters.rent
                            }
                        }
                    ]
                }
            },
        ]

    }
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
}


// Get the saved Service Providers
const getSavedServiceProviders = async (userId: string, filters: any, options: IPaginationOptions) => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);

    const whereConditions: Prisma.SavedItemWhereInput = {
        AND: [
            {
                userId: userId,
                itemType: "SERVICE"
            },
            {
                serviceProvider: {
                    OR: [
                        {
                            firstName: {
                                contains: filters.name
                            },
                            Service: {
                                serviceType: filters.serviceType,
                                serviceAvailability: filters.priority,
                                minPrice: {
                                    gte: filters.price
                                },
                                maxPrice: { lte: filters.price }

                            },
                        },
                        {
                            lastName: {
                                contains: filters.name
                            },
                            Service: {
                                serviceType: filters.serviceType,
                                serviceAvailability: filters.priority,
                                minPrice: {
                                    gte: filters.price
                                },
                                maxPrice: { lte: filters.price }

                            },
                        },
                    ]
                }
            },
        ]

    }
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
                serviceProvider: true
            }
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
}
export const SavedItemServices = {
    getSavedTenants,
    getSavedServiceProviders,
    createSavedItem,
    removeSavedItem
};
