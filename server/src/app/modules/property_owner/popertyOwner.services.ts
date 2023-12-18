import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma"
import { IPropertyOwner } from "./propertyOwner.interfaces";

const createOrUpdatePropertyOwner = async (payload: IPropertyOwner) => {
    const propertyOwner = await prisma.$transaction(async transactionClient => {
        const { firstName, lastName, phoneNumber, userEmail } = payload;
        const user = await transactionClient.user.findUnique({
            where: {
                email: userEmail,
            },
        });

        var res: any = null;
        if (user) {
            res = await transactionClient.propertyOwner.upsert({
                where: {
                    userId: user?.userId,
                },
                update: {
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber

                },
                create: {
                    userId: user?.userId,
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber
                },
            });
        }

        if (!res) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'User creation failed');
        }
        return res;
    })
    return propertyOwner;
}

export const PropertyOwnerServices = {
    createOrUpdatePropertyOwner
}