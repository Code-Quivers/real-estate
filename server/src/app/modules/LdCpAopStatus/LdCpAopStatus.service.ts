import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

import {
  IldCpAopStatusCreateRequest,
  IldCpAopStatusResponse,
} from './LdCpAopStatus.interface';

// modules

// !----------------------------------Create New LdCpAopStatus---------------------------------------->>>

const createNewLdCpAopStatus = async (
  profileId: string,
  data: IldCpAopStatusCreateRequest
): Promise<IldCpAopStatusResponse> => {
  const isExistStyle = await prisma.styles.findUnique({
    where: {
      styleNo: data?.styleNo,
    },
  });
  if (!isExistStyle) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Style Not Found !!');
  }

  const ldCpAopStatusDetails = {
    ldCpAopStatusComment: data?.ldCpAopStatusComment,
    styleNo: data?.styleNo,
    profileId,
  };

  const result = await prisma.ldCpAopStatus.create({
    data: ldCpAopStatusDetails,
    select: {
      styleNo: true,
      ldCpAopStatusComment: true,
      createdAt: true,
    },
  });

  return result;
};

export const LdCpAopStatusService = {
  createNewLdCpAopStatus,
};
