import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IRequestUser } from '../users/user.interface';
import { LdCpAopStatusService } from './LdCpAopStatus.service';

// !----------------------------------Create New LdCpAopStatus--------------------------------------->>>
const createNewLdCpAopStatus = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const profileId = (req.user as IRequestUser).profileId;

    const result = await LdCpAopStatusService.createNewLdCpAopStatus(
      profileId,
      payload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'LdCpAopStatus created successfully',
      data: result,
    });
  }
);

export const LdCpAopStatusController = {
  createNewLdCpAopStatus,
};
