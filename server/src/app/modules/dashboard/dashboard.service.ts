import prisma from "../../../shared/prisma";

// ! get saved units
const getDashboardData = async () => {
  //
  const result = await prisma.$transaction(async (transactionClient) => {
    const tenantsCount = await transactionClient.tenant.aggregate({
      _count: true,
      where: {
        user: {
          userStatus: {
            in: ["ACTIVE", "PAUSED", "SUSPENDED"],
          },
        },
      },
    });
    const propertyOwnersCount = await transactionClient.propertyOwner.aggregate({
      _count: true,
      where: {
        user: {
          userStatus: {
            in: ["ACTIVE", "PAUSED", "SUSPENDED"],
          },
        },
      },
    });
    const serviceProvidersCount = await transactionClient.serviceProvider.aggregate({
      _count: true,
      where: {
        user: {
          userStatus: {
            in: ["ACTIVE", "PAUSED", "SUSPENDED"],
          },
        },
      },
    });

    // total properties
    const propertiesCount = await transactionClient.property.aggregate({
      _count: true,
      where: {
        planType: {
          in: ["ON_TRIAL", "PREMIUM"],
        },
      },
    });
    return {
      totalTenants: tenantsCount,
      totalPropertyOwners: propertyOwnersCount,
      totalServiceProviders: serviceProvidersCount,
      totalProperties: propertiesCount,
    };
  });

  return result;
};

export const DashboardDataServices = {
  getDashboardData,
};
