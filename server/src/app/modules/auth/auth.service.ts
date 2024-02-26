/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import { ILoginUserResponse, IRefreshTokenResponse, IUserCreate, IUserLogin } from "./auth.interface";
import { UserRoles, UserStatus } from "@prisma/client";
import { userFindUnique } from "./auth.utils";

//! Tenant User Create

const createNewUserForTenant = async (payload: IUserCreate) :Promise<ILoginUserResponse>=> {
  const { password, email, userName } = payload;
  const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

  const result = await prisma.$transaction(async (transactionClient) => {
    await userFindUnique(userName, email, transactionClient);

    const createdUser = await transactionClient.user.create({
      data: {
        email,
        password: hashedPassword,
        userName,
        role: UserRoles.TENANT,
        userStatus: UserStatus.ACTIVE,
      },
    });

    if (!createdUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User creation failed");
    }

    const tenantData: any = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      user: {
        connect: {
          userId: createdUser.userId,
        },
      },
      // profileImage: payload?.profileImage,
    };

    const tenantUser = await transactionClient.tenant.create({
      data: tenantData,
      select: {
        firstName: true,
        lastName: true,
        tenantId: true,
        userId: true,
        user: {
          select: {
            userName: true,
            email: true,
            role: true,
            userStatus: true,
            userId:true
          },
        },
      },
    });

    if (!tenantUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Tenant creation failed");
    }


    const {tenantId,user} = tenantUser
    
    // ! getting log in information
    const accessToken = jwtHelpers.createToken(
      {
        userId :user?.userId,
        email:user?.email,
        role:user?.role,
        profileId:  tenantId ,
        userStatus:user?.userStatus,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string,
    );
    const refreshToken = jwtHelpers.createToken(
      {
        userId :user?.userId,
        email:user?.email,
        role:user?.role,
        profileId:  tenantId ,
        userStatus:user?.userStatus,
      },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string,
    );
  
    return {
      accessToken,
      refreshToken,
    };
    
 
  });

  return result;
};

//! Property Owner User Create

const createNewUserForPropertyOwner = async (payload: IUserCreate) :Promise<ILoginUserResponse>=> {
  const { password, email, userName } = payload;
  const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

  // transaction start
  const result = await prisma.$transaction(async (transactionClient) => {
    await userFindUnique(userName, email, transactionClient);

    const createdUser = await transactionClient.user.create({
      data: {
        email,
        password: hashedPassword,
        userName,
        role: UserRoles.PROPERTY_OWNER,
        userStatus: UserStatus.ACTIVE,
      },
    });

    if (!createdUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User creation failed");
    }

    const propertyOwnerData: any = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      user: {
        connect: {
          userId: createdUser.userId,
        },
      },
      // profileImage: payload?.profileImage,
    };

    const propertyOwnerUser = await transactionClient.propertyOwner.create({
      data: propertyOwnerData,
      select: {
        firstName: true,
        lastName: true,
        propertyOwnerId: true,
        user: {
          select: {
            userId: true,
            userName: true,
            email: true,
            role: true,
            userStatus: true,
          },
        },
      },
    });

    if (!propertyOwnerUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Property Owner creation failed");
    }

    // ! getting log in information
    const {propertyOwnerId,user} = propertyOwnerUser
    
    const accessToken = jwtHelpers.createToken(
      {
        userId :user?.userId,
        email:user?.email,
        role:user?.role,
        profileId:  propertyOwnerId ,
        userStatus:user?.userStatus,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string,
    );
    const refreshToken = jwtHelpers.createToken(
      {
        userId :user?.userId,
        email:user?.email,
        role:user?.role,
        profileId:  propertyOwnerId ,
        userStatus:user?.userStatus,
      },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string,
    );
  
    return {
      accessToken,
      refreshToken,
    };
    
    
    
    
     
  });

  return result;
};

//! Service Provider User Create

const createNewUserForServiceProvider = async (payload: IUserCreate) :Promise<ILoginUserResponse> => {
  const { password, email, userName } = payload;
  const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

  // transaction start
  const result = await prisma.$transaction(async (transactionClient) => {
    await userFindUnique(userName, email, transactionClient);

    const createdUser = await transactionClient.user.create({
      data: {
        email,
        password: hashedPassword,
        userName,
        role: UserRoles.SERVICE_PROVIDER,
        userStatus: UserStatus.ACTIVE,
      },
    });

    if (!createdUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User creation failed");
    }

    const serviceProviderData: any = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      user: {
        connect: {
          userId: createdUser.userId,
        },
      },
      // profileImage: payload?.profileImage,
    };

    const serviceProviderUser = await transactionClient.serviceProvider.create({
      data: serviceProviderData,
      select: {
        firstName: true,
        lastName: true,
        serviceProviderId: true,
        user: {
          select: {
            userId: true,
            userName: true,
            email: true,
            role: true,
            userStatus: true,
          },
        },
      },
    });

    if (!serviceProviderUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Service Provider creation failed");
    }


    const {serviceProviderId,user} = serviceProviderUser
    
    // ! getting log in information
    const accessToken = jwtHelpers.createToken(
      {
        userId :user?.userId,
        email:user?.email,
        role:user?.role,
        profileId:  serviceProviderId ,
        userStatus:user?.userStatus,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string,
    );
    const refreshToken = jwtHelpers.createToken(
      {
        userId :user?.userId,
        email:user?.email,
        role:user?.role,
        profileId:  serviceProviderId ,
        userStatus:user?.userStatus,
      },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string,
    );
  
    return {
      accessToken,
      refreshToken,
    };
    
    
    
     
  });

  return result;
};

//login
const userLogin = async (loginData: IUserLogin): Promise<ILoginUserResponse> => {
  const { emailOrUsername, password } = loginData;

  const isUserExist = await prisma.user.findFirst({
    where: {
      OR: [{ email: { contains: emailOrUsername, mode: "insensitive" } }, { userName: { contains: emailOrUsername, mode: "insensitive" } }],
    },
    include: {
      tenant: {
        select: {
          firstName: true,
          lastName: true,
          tenantId: true,
        },
      },
      propertyOwner: {
        select: {
          firstName: true,
          lastName: true,
          propertyOwnerId: true,
        },
      },
      serviceProvider: {
        select: {
          firstName: true,
          lastName: true,
          serviceProviderId: true,
        },
      },
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found !!");
  }

  const isPasswordValid = await bcrypt.compare(password, isUserExist?.password);

  if (isUserExist && !isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect !!");
  }

  const { userId, tenant, propertyOwner, serviceProvider, role, userStatus, email: loggedInEmail } = isUserExist;

  // create access token & refresh token
  const accessToken = jwtHelpers.createToken(
    {
      userId,
      role,
      profileId: tenant?.tenantId || propertyOwner?.propertyOwnerId || serviceProvider?.serviceProviderId,
      email: loggedInEmail,
      userStatus,
      firstName: tenant?.firstName || propertyOwner?.firstName || serviceProvider?.firstName,
      lastName: tenant?.lastName || propertyOwner?.lastName || serviceProvider?.lastName,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  const refreshToken = jwtHelpers.createToken(
    {
      userId,
      role,
      profileId: tenant?.tenantId || propertyOwner?.propertyOwnerId || serviceProvider?.serviceProviderId,
      email: loggedInEmail,
      userStatus,
      firstName: tenant?.firstName || propertyOwner?.firstName || serviceProvider?.firstName,
      lastName: tenant?.lastName || propertyOwner?.lastName || serviceProvider?.lastName,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

// !refreshToken --------------------------------
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // ! verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refresh_secret as Secret);
  } catch (error) {
    // err
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }
  //! if user not exist
  // !checking deleted user's refresh token
  const { userId } = verifiedToken;

  const isUserExist = await prisma.user.findFirst({
    where: {
      userId,
    },
    include: {
      tenant: {
        select: {
          firstName: true,
          lastName: true,
          tenantId: true,
        },
      },
      propertyOwner: {
        select: {
          firstName: true,
          lastName: true,
          propertyOwnerId: true,
        },
      },
      serviceProvider: {
        select: {
          firstName: true,
          lastName: true,
          serviceProviderId: true,
        },
      },
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exists!!");
  }

  const { tenant, propertyOwner, serviceProvider, role, userStatus, email: loggedInEmail } = isUserExist;

  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      userId,
      role,
      profileId: tenant?.tenantId || propertyOwner?.propertyOwnerId || serviceProvider?.serviceProviderId,
      email: loggedInEmail,
      userStatus,
      firstName: tenant?.firstName || propertyOwner?.firstName || serviceProvider?.firstName,
      lastName: tenant?.lastName || propertyOwner?.lastName || serviceProvider?.lastName,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  createNewUserForTenant,
  createNewUserForPropertyOwner,
  createNewUserForServiceProvider,
  userLogin,
  refreshToken,
};
