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


const getSavedItems = async (fitlers: any, options: IPaginationOptions) => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);

    // const { searchTerm, ...filterData } = filters;
    console.log(fitlers)
    console.log(limit)
    console.log(`${page}---${skip}`)

    const whereConditions: Prisma.SavedItemWhereInput = {
        user: {
            tenant: {
                firstName: {
                    contains: fitlers.name
                },
                // presentAddress: {
                //     contains: fitlers.address
                // },
                // affordableRentAmount: {
                //     gte: fitlers.rent
                // }
            }
        },

    }
    //
    const result = await prisma.$transaction(async (transactionClient) => {
        const savedItems = await transactionClient.savedItem.findMany({
            // where: whereConditions,
            skip,
            take: limit,
            orderBy:
                options.sortBy && options.sortOrder
                    ? { [options.sortBy]: options.sortOrder }
                    : {
                        createdAt: "desc",
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
}

export const SavedItemServices = {
    getSavedItems,
    createSavedItem
};
