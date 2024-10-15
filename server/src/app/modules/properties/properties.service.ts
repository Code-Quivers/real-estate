/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request } from "express";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { Prisma, Property } from "@prisma/client";
import { IUploadFile } from "../../../interfaces/file";
import {
  IAssignServiceProviderToProperty,
  IAssignTenantToProperty,
  IPropertiesFilterRequest,
  IPropertyData,
  IPropertyReqPayload,
  IPropertyUpdate,
  IRemoveTenantFromProperty,
} from "./properties.interfaces";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import {
  propertiesRelationalFields,
  propertiesRelationalFieldsMapper,
  propertiesSearchableFields,
} from "./properties.constants";
import { calculatePropertyScore } from "./properties.utils";
import { differenceInMonths } from "../tenants/tenants.utils";

// ! createNewProperty
const createNewProperty = async (profileId: string, req: Request) => {
  // Ensure req.files and req.body exist and have correct types
  const images: IUploadFile[] = (req.files as any) || [];
  const data: any[] = req?.body || [];
  // Use meaningful variable names
  const imagesPath: { [key: number]: string[] } = {};
  // Process images
  images?.forEach((image: IUploadFile) => {
    const propId: number = parseInt(image.originalname.split("_")[0]);
    // Use the logical nullish assignment operator to handle undefined case
    imagesPath[propId] ??= [];
    imagesPath[propId].push(`property/${image.filename}`);
  });

  // Process property info
  const propertyInfo: IPropertyData[] = data?.map((item: any) => {
    const propId: number = item?.fieldId;
    const imagesForId: string[] = imagesPath[propId] || []; // Handle case when no images found for property id

    return {
      ...item, // Spread the properties of item
      images: imagesForId,
      ownerId: profileId, // Assuming profileId is defined somewhere
    };
  });

  // Remove the 'id' property from each item in propertyInfo
  propertyInfo.forEach((item: any) => {
    delete item["fieldId"];
  });
  // if property is created , creating a new order

  const createdData = await prisma.$transaction(async (transactionClient) => {
    //
    const result = [];
    for (const singleProperty of propertyInfo) {
      // updating unit score
      const unitScore = calculatePropertyScore(singleProperty);
      //
      const createdProperty = await transactionClient.property.create({
        data: { ...singleProperty, score: unitScore.propertyScore, scoreRatio: unitScore.scoreRatio },
      });
      result.push(createdProperty.propertyId);
    }

    // const results = await transactionClient.property.createMany({
    //   data: propertyInfo,

    // });
    if (!result?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Property Creation Failed !");
    }

    const createOrder = await transactionClient.order.create({
      data: {
        ownerId: profileId,
        properties: {
          connect: result.map((propertyId) => ({ propertyId })),
        },
      },
      include: {
        _count: true,
        properties: {
          select: {
            propertyId: true,
            title: true,
          },
        },
        owner: true,
      },
    });

    return createOrder;
  });
  return createdData;
};

// ! Getting all available property========================================================================
const getAllAvailableProperty = async (filters: IPropertiesFilterRequest, options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];
  // Search
  if (searchTerm) {
    andConditions.push({
      OR: propertiesSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // Filter
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (propertiesRelationalFields.includes(key)) {
          return {
            [propertiesRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.PropertyWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};
  //

  const result = await prisma.$transaction(async (transactionClient) => {
    const properties = await transactionClient.property.findMany({
      include: {
        owner: true,
      },
      where: {
        ...whereConditions,
        isRented: false,
        planType: {
          in: ["ON_TRIAL", "PREMIUM"],
        },
      },
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
              createdAt: "asc",
            },
    });
    const total = await prisma.property.count({
      where: { ...whereConditions, isRented: false },
    });

    const totalPage = Math.ceil(total / limit);
    return {
      meta: {
        page,
        limit,
        total,
        totalPage,
      },
      data: properties,
    };
  });

  return result;
};

// ! Getting all available property for super admin ========================================================================
const getAllProperties = async (filters: IPropertiesFilterRequest, options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];
  // Search
  if (searchTerm) {
    andConditions.push({
      OR: propertiesSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // Filter
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (propertiesRelationalFields.includes(key)) {
          return {
            [propertiesRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.PropertyWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};
  //

  const result = await prisma.$transaction(async (transactionClient) => {
    const properties = await transactionClient.property.findMany({
      where: {
        ...whereConditions,
        planType: {
          in: ["ON_TRIAL", "PREMIUM"],
        },
      },
      select: {
        propertyId: true,
        address: true,
        createdAt: true,
        isActive: true,
        isRented: true,
        monthlyRent: true,
        packageType: true,
        // paidFrom: true,
        // paidTo: true,
        planType: true,
        title: true,
        tenantAssignedAt: true,
        owner: {
          select: {
            firstName: true,
            lastName: true,
            phoneNumber: true,
            user: {
              select: {
                email: true,
              },
            },
          },
        },
        Tenant: {
          select: {
            firstName: true,
            lastName: true,
            phoneNumber: true,
            presentAddress: true,
            tenantId: true,
            user: {
              select: {
                email: true,
                userStatus: true,
              },
            },
            orders: {
              select: {
                updatedAt: true,
                properties: {
                  select: {
                    tenantAssignedAt: true,
                  },
                },
              },
              orderBy: {
                updatedAt: "desc",
              },
            },
          },
        },
        serviceProviders: {
          select: {
            firstName: true,
            lastName: true,
            companyAddress: true,
            companyEmailAddress: true,
            companyName: true,
            companyPhoneNumber: true,
            phoneNumber: true,
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
              createdAt: "desc",
            },
    });

    const propertiesWithTenantInfo = await Promise.all(
      properties.map(async (property) => {
        if (property.Tenant) {
          const { tenantId } = property.Tenant;

          // Fetch order data for this tenant and property
          const orderData = await transactionClient.order.findMany({
            where: {
              tenantId,
              properties: {
                some: { propertyId: property.propertyId },
              },
              orderStatus: "CONFIRMED",
            },
            select: {
              updatedAt: true,
            },
            orderBy: {
              updatedAt: "desc",
            },
          });

          // Calculate due months
          const tenantAssignedDate = property?.tenantAssignedAt;
          let dueMonths;

          if (orderData?.length === 0 || (tenantAssignedDate as Date) > orderData[0]?.updatedAt) {
            dueMonths = differenceInMonths(new Date(), tenantAssignedDate?.toISOString() as any);
          } else {
            dueMonths = differenceInMonths(new Date(), orderData[0]?.updatedAt);
          }

          // Calculate due rent
          const dueRent = (property.monthlyRent || 0) * dueMonths;

          return {
            ...property,
            Tenant: {
              ...property.Tenant,
              dueRent,
              dueMonths,
              rentPaid: dueMonths > 0,
              paymentDeadline:
                orderData[0]?.updatedAt && property?.planType === "PREMIUM"
                  ? new Date(
                      new Date(orderData[0].updatedAt).setMonth(new Date(orderData[0].updatedAt).getMonth() + 1),
                    ).toISOString()
                  : "N/A",
            },
          };
        }

        return property;
      }),
    );

    // ! ----total
    const total = await prisma.property.count({
      where: {
        ...whereConditions,
        planType: {
          in: ["ON_TRIAL", "PREMIUM"],
        },
      },
    });

    const totalPage = Math.ceil(total / limit);
    return {
      meta: {
        page,
        limit,
        total,
        totalPage,
      },
      data: propertiesWithTenantInfo,
    };
  });

  return result;
};

// ! get my all properties for property owner
// Getting all property
const getPropertyOwnerAllProperty = async (
  profileId: string,
  filters: IPropertiesFilterRequest,
  options: IPaginationOptions,
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: propertiesSearchableFields.map((field: any) => ({
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
        if (propertiesRelationalFields.includes(key)) {
          return {
            [propertiesRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.PropertyWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};
  //

  const result = await prisma.$transaction(async (transactionClient) => {
    const properties = await transactionClient.property.findMany({
      include: {
        owner: {
          select: {
            createdAt: true,
            firstName: true,
            lastName: true,
            userId: true,
          },
        },
        orders: {
          where: {
            orderStatus: {
              in: ["CONFIRMED", "PROCESSING"],
            },
            PaymentInformation: {
              isNot: null,
            },
          },
          select: {
            orderStatus: true,
            PaymentInformation: true,
          },
        },
        Tenant: true,
        _count: true,
        serviceProviders: {
          include: {
            Service: true,
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
      where: {
        ...whereConditions,
        ownerId: profileId,
        planType: {
          in: ["ON_TRIAL", "PREMIUM"],
        },
      },
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
              createdAt: "desc",
            },
    });
    const total = await prisma.property.count({
      where: {
        ...whereConditions,
        owner: {
          propertyOwnerId: profileId,
        },
        planType: {
          in: ["ON_TRIAL", "PREMIUM"],
        },
      },
    });

    const totalPage = Math.ceil(total / limit);
    return {
      meta: {
        page,
        limit,
        total,
        totalPage,
      },
      data: properties,
    };
  });

  return result;
};
// ! get my all properties for property owner (----Payment-----)
// Getting all property
const getPropertyOwnerAllPropertyForPayment = async (
  profileId: string,
  filters: IPropertiesFilterRequest,
  options: IPaginationOptions,
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: propertiesSearchableFields.map((field: any) => ({
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
        if (propertiesRelationalFields.includes(key)) {
          return {
            [propertiesRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.PropertyWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};
  //

  const result = await prisma.$transaction(async (transactionClient) => {
    const properties = await transactionClient.property.findMany({
      include: {
        owner: {
          select: {
            createdAt: true,
            firstName: true,
            lastName: true,
            userId: true,
          },
        },
        orders: {
          where: {
            // orderStatus: {
            //   // in: ["CONFIRMED", "PROCESSING"],
            // },
            // PaymentInformation: {
            //   isNot: null,
            // },
          },
          select: {
            orderStatus: true,
            PaymentInformation: true,
          },
        },
        Tenant: true,
        _count: true,
        serviceProviders: {
          include: {
            Service: true,
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
      where: {
        ...whereConditions,
        ownerId: profileId,
        planType: {
          in: ["ON_TRIAL", "PREMIUM"],
        },
      },
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
              createdAt: "desc",
            },
    });
    const total = await prisma.property.count({
      where: {
        ...whereConditions,
        owner: {
          propertyOwnerId: profileId,
        },
        planType: {
          in: ["ON_TRIAL", "PREMIUM"],
        },
      },
    });

    const totalPage = Math.ceil(total / limit);
    return {
      meta: {
        page,
        limit,
        total,
        totalPage,
      },
      data: properties,
    };
  });

  return result;
};

//! get single property info
const getSinglePropertyInfo = async (propertyId: string): Promise<Property | null> => {
  const res = await prisma.$transaction(async (transactionClient) => {
    const properties = await transactionClient.property.findUnique({
      where: {
        propertyId,
      },
      include: {
        owner: true,
      },
    });

    if (!properties) {
      throw new ApiError(httpStatus.NOT_FOUND, "Property Not Found");
    }

    return properties;
  });
  return res;
};

// ! update property info
const updatePropertyInfo = async (propertyId: string, req: Request): Promise<Property> => {
  // Extract new images paths
  const newImagesPath: string[] = ((req.files as IUploadFile[]) || []).map(
    (item: IUploadFile) => `property/${item?.filename}`,
  );

  // Extract old images paths from the request body
  const oldImagesPath: string[] = (req.body.images || []).map((imageName: string) => `${imageName}`);

  // Combine old and new image paths
  const imagesPath: string[] = oldImagesPath.concat(newImagesPath);

  const {
    address,
    allowedPets,
    description,
    maintenanceCoveredOwner,
    maintenanceCoveredTenant,
    numOfBath,
    numOfBed,
    schools,
    universities,
    monthlyRent,
    title,
  } = req?.body as IPropertyReqPayload;

  const result = await prisma.$transaction(async (transactionClient) => {
    const updatedPropertyData: any = {
      title,
      address,
      allowedPets,
      description,
      maintenanceCoveredOwner,
      maintenanceCoveredTenant,
      numOfBath,
      numOfBed,
      schools,
      universities,
      monthlyRent,
    };

    if (imagesPath?.length) updatedPropertyData["images"] = imagesPath;

    //
    const updatedProperty = await transactionClient.property.update({
      where: {
        propertyId,
      },
      data: updatedPropertyData,
    });
    if (!updatedProperty) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Property Creation Failed !");
    }

    if (updatedProperty) {
      // updating unit score
      const unitScore = calculatePropertyScore(updatedProperty);
      //
      await transactionClient.property.update({
        where: {
          propertyId,
        },
        data: { score: unitScore.propertyScore, scoreRatio: unitScore.scoreRatio },
      });
    }

    return updatedProperty;
  });
  return result;
};

// ! update property details for super admin
const updatePropertyDetailsFromAdmin = async (propertyId: string, payload: IPropertyUpdate): Promise<Property> => {
  const result = await prisma.$transaction(async (transactionClient) => {
    // Check if property exists
    const isExistProperty = await transactionClient.property.findUnique({
      where: { propertyId },
    });

    if (!isExistProperty) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Property not found!");
    }

    // Prepare updated property data
    const updatedPropertyData: any = {};
    if (payload?.address) updatedPropertyData.address = payload.address;
    // if (payload?.rentAmount) updatedPropertyData.monthlyRent = payload.rentAmount;

    // Update property
    const updatedProperty = await transactionClient.property.update({
      where: { propertyId },
      data: updatedPropertyData,
    });

    // Check and update payment deadline if necessary
    // if (payload?.paymentDeadline) {
    //   if (isExistProperty?.paidTo && isExistProperty.planType === "PREMIUM") {
    //     if (payload.paymentDeadline <= isExistProperty?.paidTo) {
    //       throw new ApiError(httpStatus.BAD_REQUEST, "New payment deadline must be greater than the current one!");
    //     }

    //     await transactionClient.property.update({
    //       where: { propertyId },
    //       data: { paidTo: payload.paymentDeadline },
    //     });
    //   } else {
    //     throw new ApiError(
    //       httpStatus.BAD_REQUEST,
    //       `Plan Type is ${isExistProperty.planType}. Premium must be activated!`,
    //     );
    //   }
    // }

    // Update property score
    const unitScore = calculatePropertyScore(updatedProperty);
    await transactionClient.property.update({
      where: { propertyId },
      data: {
        score: unitScore.propertyScore,
        scoreRatio: unitScore.scoreRatio,
      },
    });

    return updatedProperty;
  });

  return result;
};

//! -------------------------------------------------------------------------------------------------------------

// ! assign service providers to property -----------
const assignServiceProviderToProperty = async (profileId: string, payload: IAssignServiceProviderToProperty) => {
  const { propertyId, serviceProviderId } = payload;

  const result = await prisma.$transaction(async (transactionClient) => {
    // Check if the user is the owner of the property
    const isOwner = await transactionClient.property.findFirst({
      where: {
        propertyId,
        ownerId: profileId,
      },
    });

    if (!isOwner) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "You are not the owner of this property or this property does not exist",
      );
    }

    // Check if the property is already assigned to the serviceProvider
    const isAlreadyAssigned = await transactionClient.property.findFirst({
      where: {
        propertyId,
        serviceProviders: {
          some: {
            serviceProviderId,
          },
        },
      },
    });

    if (isAlreadyAssigned) {
      throw new ApiError(httpStatus.CONFLICT, "Already Assigned this Provider");
    }

    // Assign the serviceProvider to the property
    const res = await transactionClient.property.update({
      where: {
        propertyId,
      },
      data: {
        serviceProviders: {
          connect: {
            serviceProviderId,
          },
        },
      },
    });

    if (!res) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Service Provider Assign Failed");
    }

    return res;
  });

  return result;
};

// ! assign tenant user to property or unit -----------------
const assignTenantToProperty = async (profileId: string, payload: IAssignTenantToProperty) => {
  const { propertyId, tenantId } = payload;

  const result = await prisma.$transaction(async (transactionClient) => {
    // check if owner or not
    const isOwner = await transactionClient.property.findUnique({
      where: {
        propertyId,
        ownerId: profileId,
      },
    });

    if (!isOwner) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Property does not exist");
    }

    if (isOwner?.planType === "ON_TRIAL" || isOwner?.planType === "PREMIUM") {
      const isFinancialAdded = await transactionClient.propertyOwner.findUnique({
        where: {
          propertyOwnerId: profileId,
          FinancialAccount: {
            is: {
              detailsSubmitted: true,
            },
          },
        },
      });

      // check financial account added or not

      if (!isFinancialAdded) {
        throw new ApiError(httpStatus.BAD_REQUEST, "You haven't added your Card Details");
      }
    }

    // check if already assigned to other property
    const isAlreadyAssigned = await transactionClient.tenant.findUnique({
      where: {
        tenantId,
        property: {
          isNot: null,
        },
      },
    });

    if (isAlreadyAssigned) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Tenant is already assigned to other property");
    }
    // check is property already booked or not

    const isPropertyBooked = await prisma.property.findUnique({
      where: {
        propertyId,
        Tenant: {
          isNot: null,
        },
      },
    });

    if (isPropertyBooked) {
      throw new ApiError(httpStatus.CONFLICT, "Property is Already Booked");
    }

    // update logic
    const res = await transactionClient.tenant.update({
      where: {
        tenantId, // use tenantId here for the update
      },
      data: {
        property: {
          connect: {
            propertyId,
          },
        },
      },
      select: {
        tenantId: true,
        property: true,
      },
    });

    if (res) {
      await transactionClient.property.update({
        where: {
          propertyId,
        },
        data: {
          isRented: true,
          tenantAssignedAt: new Date(),
        },
      });
    }

    if (!res) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Tenant Assign Failed");
    }

    return res;
  });

  return result;
};
// ! remove  tenant user from property or unit -----------------
const removeTenantFromProperty = async (profileId: string, payload: IRemoveTenantFromProperty) => {
  const { propertyId, tenantId } = payload;

  const result = await prisma.$transaction(async (transactionClient) => {
    // check if owner or not
    const isOwner = await transactionClient.property.findUnique({
      where: {
        propertyId,
        ownerId: profileId,
      },
    });

    if (!isOwner) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "You are not the owner of this property or this property does not exist",
      );
    }

    // check is property  booked or not by this tenant

    const isPropertyBooked = await prisma.property.findUnique({
      where: {
        propertyId,
        Tenant: { tenantId },
        isRented: true,
      },
    });

    if (!isPropertyBooked) {
      throw new ApiError(httpStatus.CONFLICT, "Property is not assigned by this tenant");
    }

    // update logic
    const res = await transactionClient.tenant.update({
      where: {
        tenantId, // use tenantId here for the update
      },
      data: {
        property: {
          disconnect: true,
          update: {
            isRented: false,
          },
        },
      },
    });

    if (!res) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Tenant remove Failed");
    }

    return res;
  });

  return result;
};

//! get single property info (super admin)
const deleteSinglePropertyData = async (propertyId: string): Promise<Property | null> => {
  const res = await prisma.$transaction(async (transactionClient) => {
    const isExistProperty = await transactionClient.property.findUnique({
      where: {
        propertyId,
      },
      include: {
        owner: true,
        Tenant: true,
        serviceProviders: true,
      },
    });

    if (!isExistProperty) {
      throw new ApiError(httpStatus.NOT_FOUND, "Property Not Found");
    }

    // ! remove tenant
    if (isExistProperty?.isRented && isExistProperty?.Tenant) {
      // update logic
      const removingTenant = await transactionClient.tenant.update({
        where: {
          tenantId: isExistProperty?.Tenant?.tenantId, // use tenantId here for the update
        },
        data: {
          property: {
            disconnect: true,
            update: {
              isRented: false,
            },
          },
        },
      });
      if (!removingTenant) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Property removing failed (tenant assigned)");
      }
    }
    // ! remove service providers
    if (isExistProperty?.serviceProviders?.length > 0) {
      // update logic
      const removingServiceProviders = await transactionClient.property.update({
        where: {
          propertyId,
        },
        data: {
          serviceProviders: {
            disconnect: isExistProperty?.serviceProviders?.map((provider) => ({
              serviceProviderId: provider?.serviceProviderId,
            })),
          },
        },
      });
      if (!removingServiceProviders) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Property removing failed (Service Provider assigned)");
      }
    }
    // ! removing property
    const removingPropertyData = await transactionClient.property.delete({
      where: {
        propertyId,
      },
    });
    if (!removingPropertyData) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Property removing failed");
    }

    return removingPropertyData;
  });
  return res;
};

export const PropertiesService = {
  createNewProperty,
  getAllAvailableProperty,
  getSinglePropertyInfo,
  updatePropertyInfo,
  getPropertyOwnerAllProperty,
  assignTenantToProperty,
  assignServiceProviderToProperty,
  removeTenantFromProperty,
  getPropertyOwnerAllPropertyForPayment,
  // dashboard
  getAllProperties,
  updatePropertyDetailsFromAdmin,
  deleteSinglePropertyData,
};
