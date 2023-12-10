import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IRequestUser } from '../users/user.interface';
import { BulkProductionFilterableFields } from './BulkProductionStatus.constants';
import { BulkProductionStatusService } from './BulkProductionStatus.service';

// !----------------------------------Create New Bulk Production Status---------------------------------------->>>
const createNewBulkProductionStatus = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const profileId = (req.user as IRequestUser).profileId;

    const result =
      await BulkProductionStatusService.createNewPBulkProductionStatus(
        profileId,
        payload
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bulk Production Status created successfully',
      data: result,
    });
  }
);
// !----------------------------------get all Bulk Production Status---------------------------------------->>>
const getAllBulkProductionStatus = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, BulkProductionFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await BulkProductionStatusService.getAllBulkProductionStatus(
      filters,
      options
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bulk Production Status fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// !----------------------------------get Single Bulk Production Status---------------------------------------->>>
const getSingleBulkProductionStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { bulkProductionId } = req.params;
    const result =
      await BulkProductionStatusService.getSingleBulkProductionStatus(
        bulkProductionId
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bulk Production Status retrieved successfully',
      data: result,
    });
  }
);
// !----------------------------------Update Bulk Production Status---------------------------------------->>>
const updateBulkProductionStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { bulkProductionId } = req.params;

    const payload = req.body;
    const result = await BulkProductionStatusService.updateBulkProductionStatus(
      bulkProductionId,
      payload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bulk Production Status Updated successfully!!!!',
      data: result,
    });
  }
);

export const BulkProductionStatusController = {
  createNewBulkProductionStatus,
  getAllBulkProductionStatus,
  getSingleBulkProductionStatus,
  updateBulkProductionStatus,
};
