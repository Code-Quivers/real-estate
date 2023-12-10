import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PPSubmissionService } from './ppSubmission.service';

// !----------------------------------Create New PPSubmission---------------------------------------->>>
const createNewPPSubmission = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await PPSubmissionService.createPpSubmission(payload);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully Factory Submission Date added ',
      data: result,
    });
  }
);

// !----------------------------------Update PPSubmission---------------------------------------->>>
const updatePPSubmissionInformation = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await PPSubmissionService.PpSubmitDateOfFactory(payload);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully Factory Date Submitted !',
      data: result,
    });
  }
);

export const PPSubmissionController = {
  createNewPPSubmission,
  updatePPSubmissionInformation,
};
