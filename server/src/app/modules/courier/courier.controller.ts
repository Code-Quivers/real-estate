import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import {
  CourierFilterableFields,
  StyleWiseCourierFilterableFields,
} from './courier.constants';
import { CourierService } from './courier.service';

// !----------------------------------Create New Courier---------------------------------------->>>
const createNewCourier = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await CourierService.createNewCourier(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courier created successfully',
    data: result,
  });
});
// !----------------------------------get all Courier---------------------------------------->>>
const getAllCouriers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, CourierFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await CourierService.getAllCouriers(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courier fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------get Single Courier---------------------------------------->>>
const getSingleCourier = catchAsync(async (req: Request, res: Response) => {
  const { courierId } = req.params;
  const result = await CourierService.getSingleCourier(courierId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courier retrieved successfully',
    data: result,
  });
});
// !----------------------------------Update Courier---------------------------------------->>>
const updateCourierInformation = catchAsync(
  async (req: Request, res: Response) => {
    const { courierId } = req.params;
    const payload = req.body;
    const result = await CourierService.updateCourierInformation(
      courierId,
      payload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Courier Updated successfully !',
      data: result,
    });
  }
);
// !----------------------------------get all Courier---------------------------------------->>>
const getStyleWiseNoOfCourier = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, StyleWiseCourierFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await CourierService.getStyleWiseNoOfCourier(
      filters,
      options
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Courier fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

export const CourierController = {
  createNewCourier,
  getAllCouriers,
  getSingleCourier,
  updateCourierInformation,
  getStyleWiseNoOfCourier,
};
