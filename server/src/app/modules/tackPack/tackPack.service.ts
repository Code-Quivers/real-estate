import { TackPack } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { ICreateTackPack } from './tackPack.interface';

// !----------------------------------Create TackPack---------------------------------------->>>
const createTackPack = async (
  profileId: string,
  payload: ICreateTackPack
): Promise<TackPack> => {
  const isExistStyleNo = await prisma.styles.findUnique({
    where: {
      styleNo: payload.styleNo,
    },
    select: {
      styleNo: true,
    },
  });
  if (!isExistStyleNo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Style No not Found !!');
  }

  const tackPackData = {
    profileId,
    tackFile: payload.tackFile,
    styleNo: payload.styleNo,
    tackPackComment: payload.tackPackComment,
  };

  const result = await prisma.tackPack.create({
    data: tackPackData,
  });

  return result;
};

export const TackPackService = {
  createTackPack,
};
