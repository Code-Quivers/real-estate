import httpStatus from "http-status";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { Prisma } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import { ISavedItem } from "./savedItem.interfaces";
import { isEmptyObject } from "../../../helpers/utils";


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
