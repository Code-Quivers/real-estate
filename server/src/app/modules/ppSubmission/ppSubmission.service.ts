import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

import {
  ICreatePPSubmission,
  IUpdatePPSubmission,
  IUpdatePPSubmissionResponse,
  IUpdatePPSubmittedResponse,
} from './ppSubmission.interface';

// !----------------------------------Create ppSubmission---------------------------------------->>>

const createPpSubmission = async (
  data: ICreatePPSubmission
): Promise<IUpdatePPSubmissionResponse> => {
  const isExistStyleNo = await prisma.styles.findUnique({
    where: {
      styleNo: data.styleNo,
    },
    select: {
      PPSubmission: true,
    },
  });
  if (!isExistStyleNo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Style No not Found !!');
  }

  if (isExistStyleNo?.PPSubmission) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Already added pp submission Date'
    );
  }

  const result = await prisma.pPSubmission.create({
    data: {
      styleNo: data.styleNo,
      factorySubmissionDate: data.factorySubmissionDate,
    },
    select: {
      createdAt: true,
      ppSubmissionId: true,
    },
  });

  return result;
};

// !----------------------------------Update ppSubmission---------------------------------------->>>
const PpSubmitDateOfFactory = async (
  payload: IUpdatePPSubmission
): Promise<IUpdatePPSubmittedResponse> => {
  const result = await prisma.$transaction(async transactionClient => {
    const existingStyleNo = await transactionClient.styles.findUnique({
      where: {
        styleNo: payload.styleNo,
      },
      select: {
        PPSubmission: true,
      },
    });

    if (!existingStyleNo) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Style Not Found!!');
    }
    if (!existingStyleNo.PPSubmission) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'PP Submission Date  Not yet given!!'
      );
    }

    if (
      existingStyleNo.PPSubmission &&
      existingStyleNo.PPSubmission.factorySubmittedDate
    ) {
      throw new ApiError(
        httpStatus.CONFLICT,
        'Factory submitted date already exists for this style'
      );
    }

    // !-----------

    // Convert ISO strings to Date objects
    const existingDate = new Date(
      existingStyleNo.PPSubmission.factorySubmissionDate
    );
    const payloadDate = new Date(payload.factorySubmittedDate);

    let delayDays;

    // Check if the Date objects are valid
    if (!isNaN(existingDate.getTime()) && !isNaN(payloadDate.getTime())) {
      const timeDifference: number =
        payloadDate.getTime() - existingDate.getTime();
      const daysDifference: number = Math.floor(
        timeDifference / (1000 * 60 * 60 * 24)
      );
      // delayDays = daysDifference < 0 ? 0 : daysDifference;
      delayDays = daysDifference < 0 ? 0 : daysDifference;
    } else {
      console.error('Invalid date strings');
    }

    // !===================

    const updatedPPSubmission = await transactionClient.pPSubmission.update({
      where: {
        styleNo: payload.styleNo,
        ppSubmissionId: payload.ppSubmissionId,
      },
      data: {
        delayDays,
        factorySubmittedDate: payload.factorySubmittedDate,
      },
      select: {
        createdAt: true,
        updatedAt: true,
        ppSubmissionId: true,
      },
    });

    return updatedPPSubmission;
  });

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to add pp Submit date of factory'
    );
  }

  return result;
};

export const PPSubmissionService = {
  createPpSubmission,
  PpSubmitDateOfFactory,
};
