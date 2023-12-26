import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { PropertiesService } from "./services.service";

import { IRequestUser } from "../../interfaces/global.interfaces";

// ! create or update
const createOrUpdateService = catchAsync(async (req: Request, res: Response) => {
  //
  const profileId = (req.user as IRequestUser).profileId;

  const result = await PropertiesService.createOrUpdateService(profileId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service Created / Updated Successfully",
    data: result,
  });
});

export const ServicesController = {
  createOrUpdateService,
};
