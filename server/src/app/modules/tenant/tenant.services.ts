import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";


const getTenants = async () => {

    const result = await prisma.$transaction(async transactionClient => {
        try {
            const tenants = await transactionClient.tenant.findMany({
                select: {
                    firstName: true,
                    lastName: true,
                    photo: true,
                    affordableRentAmount: true,
                    CurrentCreditScore: true


                },
            })
            return tenants;
        }
        catch (err) {
            console.log(err)
            throw new ApiError(httpStatus.BAD_REQUEST, 'Property fetching failed!!!');
        }
    })

    return result;
}


export const TenantServices = {
    getTenants
}