import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { factoryFilterableFields } from './factory.constants';
import { FactoryService } from './factory.service';

// !----------------------------------Create New Factory---------------------------------------->>>
const createNewFactory = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await FactoryService.createNewFactory(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Factory created successfully',
    data: result,
  });
});
// !----------------------------------get all Factory---------------------------------------->>>
const getAllFactories = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, factoryFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await FactoryService.getAllFactories(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Factory fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});
// !----------------------------------get all Factory Name---------------------------------------->>>
const getAllFactoryName = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, factoryFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await FactoryService.getAllFactoryNames(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Factory fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------get Single Factory---------------------------------------->>>
const getSingleFactory = catchAsync(async (req: Request, res: Response) => {
  const { factoryId } = req.params;
  const result = await FactoryService.getSingleFactory(factoryId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Factory retrieved successfully',
    data: result,
  });
});
// !----------------------------------Update Factory---------------------------------------->>>
const updateFactoryInformation = catchAsync(
  async (req: Request, res: Response) => {
    const { factoryId } = req.params;
    const payload = req.body;
    const result = await FactoryService.updateFactoryInformation(
      factoryId,
      payload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Factory Updated successfully!!!!',
      data: result,
    });
  }
);

// !----------------------------------get all Factories---------------------------------------->>>
const getAllFactoriesLength = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FactoryService.getAllFactoriesLength();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Factories Count fetched successfully',
      data: result,
    });
  }
);

export const FactoryController = {
  createNewFactory,
  getAllFactories,
  getSingleFactory,
  updateFactoryInformation,
  getAllFactoryName,
  getAllFactoriesLength,
};
