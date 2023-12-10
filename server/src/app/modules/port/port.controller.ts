import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { portFilterableFields } from './port.constants';
import { PortService } from './port.service';

// !----------------------------------Create New Port---------------------------------------->>>
const createNewPort = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await PortService.createNewPort(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Port created successfully',
    data: result,
  });
});
// !----------------------------------get all Port---------------------------------------->>>
const getAllPorts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, portFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await PortService.getAllPorts(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Port fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});
// !----------------------------------get all Port Names---------------------------------------->>>
const getAllPortNames = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, portFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await PortService.getAllPortNames(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Port fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------get Single Port---------------------------------------->>>
const getSinglePort = catchAsync(async (req: Request, res: Response) => {
  const { portId } = req.params;
  const result = await PortService.getSinglePort(portId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Port retrieved successfully',
    data: result,
  });
});
// !----------------------------------Update Port---------------------------------------->>>
const updatePortInformation = catchAsync(
  async (req: Request, res: Response) => {
    const { portId } = req.params;
    const payload = req.body;
    const result = await PortService.updatePortInformation(portId, payload);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Port Updated successfully!!!!',
      data: result,
    });
  }
);

export const PortController = {
  createNewPort,
  getAllPorts,
  getSinglePort,
  updatePortInformation,
  getAllPortNames,
};
