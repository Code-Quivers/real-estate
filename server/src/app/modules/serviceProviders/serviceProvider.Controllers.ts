import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { ServiceProviderServices } from './serviceProvider.service';
import catchAsync from '../../../shared/catchAsync';

const UpdateServiceProvider = catchAsync(
  async (req: Request, res: Response) => {
    const serviceProviderId = req.params?.serviceProviderId;

    const result = await ServiceProviderServices.UpdateServiceProvider(
      serviceProviderId,
      req
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Property owner created or update successful!',
      data: result,
    });
  }
);

export const ServiceProviderControllers = {
  UpdateServiceProvider,
};
