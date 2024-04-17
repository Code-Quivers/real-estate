import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ServicesService } from "./conversation.service";
import pick from "../../../shared/pick";
import { servicesFilterableFields } from "./conversation.constants";

// ! get messages
const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, servicesFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await ServicesService.getAllServices(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Services retrieved successful",
    data: result,
  });
});
// ! get single service
const getSingleService = catchAsync(async (req: Request, res: Response) => {
  //
  const serviceId = req.params?.serviceId;

  const result = await ServicesService.getSingleService(serviceId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service information retrieved Successfully",
    data: result,
  });
});

export const ServicesController = {
  getAllServices,
  getSingleService,
};
