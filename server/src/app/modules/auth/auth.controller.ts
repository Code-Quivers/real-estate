import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IRefreshTokenResponse } from "./auth.interface";
import { AuthService } from "./auth.service";

//! Tenant User Create

const createNewUserForTenant = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.createNewUserForTenant(req.body);

  const { accessToken, refreshToken } = result;
  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tenant created successfully!",
    data: {
      accessToken,
    },
  });
});

//! Property Owner User Create

const createNewUserForPropertyOwner = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.createNewUserForPropertyOwner(req.body);

  const { accessToken, refreshToken } = result;
  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Property Owner created successfully!",
    data: {
      accessToken,
    },
  });
});

//! Service Provider User Create

const createNewUserForServiceProvider = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.createNewUserForServiceProvider(req.body);

  const { accessToken, refreshToken } = result;
  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service Provider Created successfully!",
    data: {
      accessToken,
    },
  });
});

//User Login

const userLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.userLogin(req.body);

  const { accessToken, refreshToken } = result;
  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged in successfully!",
    data: {
      accessToken,
    },
  });
});

// refreshToken -------------------------

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  //! set refresh token into cookie
  // const cookieOptions = {
  //   secure: config.env === 'production',
  //   httpOnly: true,
  // };
  // res.cookie('refreshToken', refreshToken, cookieOptions);

  // ! sending response
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Logged in successfully !",
    data: result,
  });
});

// ! -------------------------------------------DASHBOARD---------------------------------------
//! Superadmin create

const createSuperAdminUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.createSuperAdminUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Superadmin Created Successfully!",
    data: result,
  });
});

//User Login

const dashboardLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.dashboardLogin(req.body);

  const { accessToken, refreshToken } = result;
  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged in successfully!",
    data: {
      accessToken,
    },
  });
});

// ! forget password
const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.forgetPassword(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reset Link sent successfully!",
    data: result,
  });
});
// ! reset password
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const resetToken = req?.params?.resetToken;
  const result = await AuthService.resetPassword(resetToken, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reset Password Successfully!",
    data: result,
  });
});

export const AuthController = {
  createNewUserForTenant,
  createNewUserForPropertyOwner,
  createNewUserForServiceProvider,
  userLogin,
  refreshToken,
  // for dashboard
  createSuperAdminUser,
  dashboardLogin,
  forgetPassword,
  resetPassword,
};
