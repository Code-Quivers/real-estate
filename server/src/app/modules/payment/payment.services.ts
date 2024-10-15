/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { OrderStatus, PaymentInformation, Prisma } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IPaymentFilterRequest, OrderWithPaymentInfo } from "./payment.interface";
import { PaymentRelationalFields, PaymentRelationalFieldsMapper, PaymentSearchableFields } from "./payment.constant";
import Stripe from "stripe";
import config from "../../../config";
import { errorLogger, infoLogger } from "../../../shared/logger";
import { sendEmailToOwnerAfterRentReceived } from "../../../shared/emailNotification/emailForRent";
import { differenceInDays, differenceInMonths } from "../tenants/tenants.utils";
import { sendDueRentEmailToTenant } from "../../../shared/emailNotification/emailForDueRent";
const stripe = new Stripe(config.stripe_sk);

const getPaymentReports = async (
  filters: IPaymentFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<PaymentInformation[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.PaymentInformationWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        ...PaymentSearchableFields.map((field: string) => ({
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        })),
      ],
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (PaymentRelationalFields.includes(key)) {
          return {
            [PaymentRelationalFieldsMapper[key]]: {
              subCategoryName: (filterData as any)[key],
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

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.PaymentInformationWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.paymentInformation.findMany({
    include: {
      order: true,
      user: {
        include: {
          propertyOwner: true,
          tenant: true,
        },
      },
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { updatedAt: "desc" },
  });

  // Count total matching orders for pagination
  const total = await prisma.paymentInformation.count({
    where: whereConditions,
  });

  // Calculate total pages
  const totalPage = limit > 0 ? Math.ceil(total / limit) : 0;

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

/**
 * Retrieves a single payment report based on the payment ID.
 * @param paymentId The ID of the payment report to retrieve.
 * @returns A Promise resolving to a PaymentInformation object or null.
 */
const getPaymentReport = async (paymentId: string): Promise<PaymentInformation | null> => {
  // Fetch a single payment report from the database based on the payment ID
  const paymentReport = await prisma.paymentInformation.findUnique({
    where: {
      id: paymentId,
    },
  });

  // If the payment report is not found, throw an error
  if (!paymentReport) {
    throw new ApiError(httpStatus.NOT_FOUND, "No payment information found!!!");
  }

  return paymentReport;
};

const getPaymentReportsWithOrderId = async (userId: string, orderId: string): Promise<PaymentInformation[] | null> => {
  // Fetch a single payment report from the database based on the payment ID
  const paymentReports = await prisma.paymentInformation.findMany({
    where: {
      orderId: orderId,
      userId: userId,
    },
  });

  // If the payment report is not found, throw an error
  if (!paymentReports) {
    throw new ApiError(httpStatus.NOT_FOUND, "No payment information found!!!");
  }

  return paymentReports;
};

// Store payment information in the database from the platform like Paypal, venmo etc.

const createPaymentReport = async (data: any): Promise<any | null> => {
  // Fetch a single payment report from the database based on the payment ID
  const isExistPaymentReport = await prisma.paymentInformation.findUnique({
    where: {
      paymentPlatformId: data?.paymentPlatformId,
    },
  });

  if (isExistPaymentReport) {
    return {
      message: "Payment report already exist",
    };
  }

  const paymentReport = await prisma.paymentInformation.create({
    data: data,
    select: {
      order: {
        select: {
          orderId: true,
          tenant: {
            select: {
              property: {
                select: {
                  ownerId: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // If the payment report is not found, throw an error
  if (!paymentReport) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No payment information found!!!");
  }
  await prisma.order.update({
    where: {
      orderId: paymentReport?.order?.orderId,
    },
    data: {
      orderStatus: OrderStatus.PROCESSING,
    },
  });

  // sending email notification to property owner

  // ! send email notification to property owner
  if (paymentReport?.order?.tenant) {
    const ownerOfProperty: any = await prisma.propertyOwner.findUnique({
      where: {
        propertyOwnerId: paymentReport?.order?.tenant?.property?.ownerId as string,
      },
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
    });

    // send email to service provider
    if (ownerOfProperty?.user?.email) {
      infoLogger.info(`sending Email : ${ownerOfProperty?.user?.email}  to property owner for rent received`);

      await sendEmailToOwnerAfterRentReceived(ownerOfProperty);
    }
  }

  return paymentReport;
};

// !==========

const getAccountFromStripe = async (options: IPaginationOptions): Promise<any> => {
  const { limit, page } = paginationHelpers.calculatePagination(options);

  // Fetch all accounts to get the total count (if this is necessary)
  const totalResponse = await stripe.accounts.list({
    limit: 100, // Set a high limit to get as many accounts as possible
  });
  const totalAccountsCount = totalResponse.data.length;

  // Calculate total pages
  const totalPages = Math.ceil(totalAccountsCount / limit);

  // Make sure the requested page is within the valid range
  if (page > totalPages) {
    throw new Error(`Page number exceeds the total number of available pages (${totalPages}).`);
  }

  // This will hold the last retrieved account for cursor pagination
  let lastAccountId: string | undefined;

  // We need to "skip" the accounts that belong to the previous pages
  const accountsToSkip = (page - 1) * limit;

  // Keep fetching pages until we've skipped enough accounts
  let skippedAccounts = 0;

  while (skippedAccounts < accountsToSkip) {
    const response = await stripe.accounts.list({
      limit,
      ...(lastAccountId && { starting_after: lastAccountId }),
    });

    if (response.data.length === 0) break; // No more data

    // Set the last account ID for the next batch
    lastAccountId = response.data[response.data.length - 1].id;

    skippedAccounts += response.data.length;
  }

  // Now, fetch the actual page of accounts
  const pageResponse = await stripe.accounts.list({
    limit,
    ...(lastAccountId && { starting_after: lastAccountId }),
  });

  // Structure the returned result
  return {
    meta: {
      page,
      limit,
      total: totalAccountsCount,
      totalPage: totalPages,
    },
    data: pageResponse?.data, // Assuming `propertiesWithTenantInfo` is the data here
  };
};

// remove  an account from stripe and database
const deleteConnectedAccount = async (accountId: string): Promise<any> => {
  const isExistAccountOnDb = await prisma.financialAccount.findUnique({
    where: {
      finOrgAccountId: accountId,
    },
  });

  if (isExistAccountOnDb) {
    const deleteFinancialAccount = await prisma.financialAccount.delete({
      where: {
        finOrgAccountId: accountId,
      },
    });

    if (!deleteFinancialAccount) {
      errorLogger.error("Failed to remove financial account from database");
    }
  }

  // delete a single account from the database based on the payment ID
  try {
    const isExistAcc = await stripe.accounts.retrieve(accountId);

    if (isExistAcc?.id) {
      try {
        await stripe.accounts.del(accountId);
      } catch (error: any) {
        errorLogger.error(`🐱‍🏍 ErrorMessages ~~`, error, error?.statusCode || httpStatus.NOT_FOUND);
        throw new ApiError(httpStatus.BAD_REQUEST, "Failed to delete account");
      }
    }
  } catch (error: any) {
    errorLogger.error(`🐱‍🏍 ErrorMessages ~~`, error, error?.statusCode || httpStatus.NOT_FOUND);
    throw new ApiError(httpStatus.BAD_REQUEST, "Account not found");
  }

  return;
};
// ! ==============================================
const checkAndUpdateBulkOrderStatus = async () => {
  // Fetch pending orders from the database
  const getAllPendingOrders = async (): Promise<any> => {
    try {
      const allOrdersData = await prisma.order.findMany({
        where: {
          orderStatus: "PROCESSING",
          PaymentInformation: {
            isNot: null,
          },
        },
        select: {
          orderId: true,
          PaymentInformation: {
            select: {
              paymentPlatformId: true,
            },
          },
          properties: {
            select: {
              propertyId: true,
              pendingPaidTo: true,
            },
          },
          tenant: {
            select: {
              property: {
                select: {
                  owner: {
                    select: {
                      FinancialAccount: {
                        select: {
                          finOrgAccountId: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      return allOrdersData?.map((order) => ({
        orderId: order.orderId,
        paymentPlatformId: order.PaymentInformation?.paymentPlatformId || "",
        finOrgAccountId: order?.tenant?.property?.owner?.FinancialAccount?.finOrgAccountId,
        properties: order?.properties || [], // Make sure to get properties
      }));
    } catch (error) {
      errorLogger.error("Error fetching orders:", error);
      return [];
      // throw new ApiError(httpStatus.BAD_REQUEST, "Could not fetch orders");
    }
  };

  // Check payment status for all orders
  const checkBulkPaymentStatus = async (orders: OrderWithPaymentInfo[]) => {
    const statusPromises = orders?.map(async (order) => {
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(order.paymentPlatformId, {
          stripeAccount: order?.finOrgAccountId,
        });

        return {
          ...order,
          paymentStatus: paymentIntent?.status,
          amount_received: paymentIntent?.amount_received ? paymentIntent?.amount_received / 100.0 : 0,
        };
      } catch (error) {
        errorLogger.error(`Error retrieving payment intent for order ID: ${order.orderId}`, error);
        return { ...order, paymentStatus: "payment_intent_not_found" };
      }
    });
    return await Promise.all(statusPromises);
  };

  // Main logic to check payment status and update orders
  const pendingOrders = await getAllPendingOrders();
  const updatedOrders = await checkBulkPaymentStatus(pendingOrders);

  const updatePromises = updatedOrders?.reduce<Prisma.PrismaPromise<any>[]>((acc, single: any) => {
    if (
      single?.paymentStatus === "succeeded" ||
      single?.paymentStatus === "processing" ||
      single?.paymentStatus === "failed"
    ) {
      acc.push(
        prisma.order.update({
          where: { orderId: single.orderId },
          data: {
            orderStatus:
              single?.paymentStatus === "succeeded"
                ? "CONFIRMED"
                : single?.paymentStatus === "processing"
                  ? "PROCESSING"
                  : "FAILED",
            PaymentInformation: {
              update: { paymentStatus: single.paymentStatus, amountPaid: single?.amount_received },
            },
            properties: {
              updateMany: {
                where: {
                  propertyId: {
                    in: single?.properties?.map((property: any) => property?.propertyId), // Extract propertyIds correctly
                  },
                },
                data: {
                  // Only update paidTo if paymentStatus is "succeeded" or "processing"
                  paidTo:
                    single?.paymentStatus === "succeeded" || single?.paymentStatus === "processing"
                      ? { set: single?.properties?.map((property: any) => property?.pendingPaidTo)[0] } // Use set to assign pendingPaidTo value
                      : undefined, // Keep the old value if status is "failed"
                  // Handle pendingPaidTo based on paymentStatus
                  pendingPaidTo:
                    single?.paymentStatus === "succeeded" || single?.paymentStatus === "failed"
                      ? null // Clear pendingPaidTo when payment succeeds or fails
                      : undefined, // Don't change pendingPaidTo if status is "processing"
                },
              },
            },
          },
        }),
      );
    }
    return acc; // Return the accumulated array
  }, []);

  // Execute the transaction with valid promises only
  if (updatePromises.length > 0) {
    await prisma.$transaction(updatePromises);
  }

  return null;
};

// ! checking and send notification for due rent of tenant

const checkAndSendNotificationForDueRent = async () => {
  //
  const result = await prisma.$transaction(async (transactionClient) => {
    //
    const getAllAssignedTenants = await transactionClient.tenant.findMany({
      where: {
        property: {
          isRented: true,
        },
      },
      select: {
        tenantId: true,
        property: {
          select: {
            propertyId: true,
            tenantAssignedAt: true,
            monthlyRent: true,
            title: true,
          },
        },
        firstName: true,
        lastName: true,
        user: {
          select: {
            email: true,
          },
        },
        phoneNumber: true,
      },
    });

    const tenantsWithPaymentInfo = await Promise.all(
      getAllAssignedTenants?.map(async (singleTenant) => {
        const { property, tenantId } = singleTenant || {};
        //
        const getOrderData = await transactionClient.order.findMany({
          where: {
            tenantId,
            properties: {
              some: { propertyId: property?.propertyId },
            },
            orderStatus: {
              in: ["CONFIRMED", "PROCESSING"],
            },
          },
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
        }); // for due month calculation
        const tenantAssignedDate = singleTenant?.property?.tenantAssignedAt;

        let dueMonths = 0;

        if (getOrderData?.length > 0) {
          if (getOrderData?.length === 0 || (tenantAssignedDate as Date) > getOrderData[0]?.updatedAt) {
            dueMonths = differenceInMonths(tenantAssignedDate?.toISOString());
          } else {
            dueMonths = differenceInMonths(getOrderData[0]?.updatedAt);
          }
        }
        let dueDays = 0;

        if (getOrderData?.length > 0) {
          if (getOrderData?.length === 0 || (tenantAssignedDate as Date) > getOrderData[0]?.updatedAt) {
            dueDays = differenceInDays(tenantAssignedDate?.toISOString());
          } else {
            dueDays = differenceInDays(getOrderData[0]?.updatedAt);
          }
        }

        //
        const dueRent = (singleTenant?.property?.monthlyRent || 0) * dueMonths;
        const tenantUnitInfo = {
          ...singleTenant,
          dueRent: dueRent,
          dueMonths: dueMonths,
          dueDays,
          rentPaid: dueRent === 0,
        };

        return tenantUnitInfo;
      }),
    );

    // Filter tenants with more than 1 day of due rent
    const tenantsWithOverdueRent = tenantsWithPaymentInfo?.filter((tenant) => tenant?.dueDays > 30 && 45);

    for (const singleTenant of tenantsWithOverdueRent) {
      try {
        await sendDueRentEmailToTenant(singleTenant);
      } catch (error) {
        console.log(`Failed to send email to tenant ${singleTenant.user?.email}:`, error);
        errorLogger.error(`Failed to send email to tenant ${singleTenant.user?.email}:`, error);
        // Continue with the next tenant
      }
    }

    return tenantsWithOverdueRent;
  });
  return result;
};

// Exporting PaymentServices object with methods
export const PaymentServices = {
  getPaymentReports,
  getPaymentReport,
  getPaymentReportsWithOrderId,
  createPaymentReport,
  getAccountFromStripe,
  deleteConnectedAccount,
  checkAndUpdateBulkOrderStatus,
  checkAndSendNotificationForDueRent,
};
