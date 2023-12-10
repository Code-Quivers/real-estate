import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IRequestUser } from '../users/user.interface';
import { portFilterableFields } from './PPStrikeOffStatus.constants';
import { PPStrikeOffStatusService } from './PPStrikeOffStatus.service';

// !----------------------------------Create New Strike Off Status---------------------------------------->>>
const createNewPPStrikeOffStatus = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const profileId = (req.user as IRequestUser).profileId;

    const result = await PPStrikeOffStatusService.createNewPPStrikeOffStatus(
      profileId,
      payload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'PP Strike Off Status created successfully',
      data: result,
    });
  }
);
// !----------------------------------get all Strike Off Status---------------------------------------->>>
const getAllPPStrikeOffStatus = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, portFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await PPStrikeOffStatusService.getAllPPStrikeOffStatus(
      filters,
      options
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Port fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// !----------------------------------get Single Strike Off Status---------------------------------------->>>
const getSinglePPStrikeOffStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { ppStatusId } = req.params;
    const result = await PPStrikeOffStatusService.getSinglePPStrikeOffStatus(
      ppStatusId
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'PP Strike Status retrieved successfully',
      data: result,
    });
  }
);
// !----------------------------------Update Strike Off Status---------------------------------------->>>
const updatePPStrikeOffStatusInformation = catchAsync(
  async (req: Request, res: Response) => {
    const { PPStatusId } = req.params;

    const payload = req.body;
    const result = await PPStrikeOffStatusService.updatePortPPStrikeOffStatus(
      PPStatusId,
      payload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Port Updated successfully!!!!',
      data: result,
    });
  }
);

export const PPStrikeOffStatusController = {
  createNewPPStrikeOffStatus,
  getAllPPStrikeOffStatus,
  getSinglePPStrikeOffStatus,
  updatePPStrikeOffStatusInformation,
};
