import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";

const propertyAdd = async (payload: any) => {
    const { images, data } = payload;
    const imagesPath = images.map(item => item.path)
    const property = await prisma.$transaction(async transactionClient => {
        const res = null;
        const owner = await transactionClient.propertyOwner.findFirst({
            where: {
                user: {
                    email: data?.userEmail,
                }
            },
        })
        if (owner) {
            const propertyData = {
                ownerId: owner.propertyOwnerId,
                images: imagesPath,
                numOfBed: data?.numOfBed,
                numOfBath: data?.numOfBath,
                address: data?.address,
                description: data?.description,
                maintenanceCoveredTenant: data?.maintenanceCoveredTenant,
                maintenanceCoveredOwner: data?.maintenanceCoveredOwner,
                schools: data?.schools,
                universities: data?.universities,
                allowedPets: data?.allowedPets
            }

            const property = await transactionClient.property.create({ data: propertyData })
            return property;
        }
        else {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Property creation failed!!!');
        }
        return res;
    })

    return property;
}

const getProperties = async () => {
    const res = await prisma.$transaction(async transactionClient => {
        const properties = await transactionClient.property.findMany()
        if (properties) {
            return properties
        } else {
            throw new ApiError(httpStatus.BAD_REQUEST, "Prperty fetching failed!!!")
        }
    });
    return res;
}

export const PropertyServices = {
    propertyAdd,
    getProperties
}