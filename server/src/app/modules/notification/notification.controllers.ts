import { Request, Response } from 'express';
import httpStatus from 'http-status';

import sendResponse from '../../../shared/sendResponse';
import { NotificationService } from './notification.services';

const getPPNotifications = async (req: Request, res: Response) => {
  const result = await NotificationService.getPPSubmissionDate();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully',
    data: result.data,
  });
};

export const NotificationController = {
  getPPNotifications,
};
