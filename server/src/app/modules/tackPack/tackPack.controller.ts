import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IRequestUser } from '../users/user.interface';
import { TackPackService } from './tackPack.service';

// !----------------------------------Create New TackPack---------------------------------------->>>
const createTackPack = catchAsync(async (req: Request, res: Response) => {
  const profileId = (req.user as IRequestUser).profileId;

  const result = await TackPackService.createTackPack(profileId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'TackPack created successfully',
    data: result,
  });
});

export const TackPackController = {
  createTackPack,
};
