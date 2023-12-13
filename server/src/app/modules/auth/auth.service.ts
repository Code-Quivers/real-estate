/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import {
  ILoginUserResponse,
  IRefreshTokenResponse,
  IUserCreate,
  IUserLogin,
} from './auth.interface';
import { UserRoles, UserStatus } from '@prisma/client';
import { userFindUnique } from './auth.utils';

//! Tenant User Create

const createNewUserForTenant = async (payload: IUserCreate) => {
  const { password, email, userName } = payload;
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );

  const newUser = await prisma.$transaction(async transactionClient => {
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
      throw new ApiError(httpStatus.BAD_REQUEST, 'User creation failed');
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
          },
        },
      },
    });

    if (!tenantUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Tenant creation failed');
    }

    return tenantUser;
  });

  return newUser;
};

//! Property Owner User Create

const createNewUserForPropertyOwner = async (payload: IUserCreate) => {
  const { password, email, userName } = payload;
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );

  // transaction start
  const newUser = await prisma.$transaction(async transactionClient => {
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
      throw new ApiError(httpStatus.BAD_REQUEST, 'User creation failed');
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
        userId: true,
        user: {
          select: {
            userName: true,
            email: true,
            role: true,
            userStatus: true,
          },
        },
      },
    });

    if (!propertyOwnerUser) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Property Owner creation failed'
      );
    }

    return propertyOwnerUser;
  });

  return newUser;
};

//! Service Provider User Create

const createNewUserForServiceProvider = async (payload: IUserCreate) => {
  const { password, email, userName } = payload;
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );

  // transaction start
  const newUser = await prisma.$transaction(async transactionClient => {
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
      throw new ApiError(httpStatus.BAD_REQUEST, 'User creation failed');
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
        userId: true,
        user: {
          select: {
            userName: true,
            email: true,
            role: true,
            userStatus: true,
          },
        },
      },
    });

    if (!serviceProviderUser) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Service Provider creation failed'
      );
    }

    return serviceProviderUser;
  });

  return newUser;
};

//login
const userLogin = async (
  loginData: IUserLogin
): Promise<ILoginUserResponse> => {
  const { email, password, userName } = loginData;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
      userName,
    },
    include: {
      tenant: {
        select: {
          firstName: true,
          lastName: true,
          tenantId: true,
        },
      },
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found !!');
  }

  const isPasswordValid = await bcrypt.compare(password, isUserExist?.password);

  if (isUserExist && !isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect !!');
  }

  const {
    userId,
    tenant,
    role,
    userStatus,
    email: loggedInEmail,
  } = isUserExist;

  // create access token & refresh token
  const accessToken = jwtHelpers.createToken(
    {
      userId,
      role,
      tenantId: tenant?.tenantId,
      email: loggedInEmail,
      userStatus,
      firstName: tenant?.firstName,
      lastName: tenant?.lastName,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    {
      userId,
      role,
      tenantId: tenant?.tenantId,
      email: loggedInEmail,
      userStatus,
      firstName: tenant?.firstName,
      lastName: tenant?.lastName,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
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
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    // err
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  //! if user not exist
  // !checking deleted user's refresh token
  const { userId } = verifiedToken;

  const isUserExist = await prisma.user.findFirst({
    where: {
      userId,
    },
    include: {
      profile: {
        select: {
          role: true,
          profileId: true,
          profileImage: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists!!');
  }
  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      userId: isUserExist?.userId,
      role: isUserExist?.profile?.role,
      profileId: isUserExist?.profile?.profileId,
      email: isUserExist?.email,
      profileImage: isUserExist?.profile?.profileImage,
      firstName: isUserExist?.profile?.firstName,
      lastName: isUserExist?.profile?.lastName,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
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
