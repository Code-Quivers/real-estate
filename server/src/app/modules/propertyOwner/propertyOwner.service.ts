/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IPropertyOwnerUpdateRequest } from './propertyOwner.interfaces';
import { Request } from 'express';
import { IUploadFile } from '../../../interfaces/file';
import fs from 'fs';
import { logger } from '../../../shared/logger';
import { PropertyOwner } from '@prisma/client';

const UpdatePropertyOwner = async (
  propertyOwnerId: string,
  req: Request
  // payload: IPropertyOwner
) => {
  const profileImage: IUploadFile = req.file as any;
  // const profileImagePath = profileImage?.path?.substring(13);
  const profileImagePath = profileImage?.path;

  const { firstName, lastName, phoneNumber, oldProfileImagePath } =
    req.body as IPropertyOwnerUpdateRequest;

  // deleting old style Image
  const oldFilePaths = 'uploads/' + oldProfileImagePath;

  if (oldProfileImagePath !== undefined && profileImagePath !== undefined) {
    fs.unlink(oldFilePaths, err => {
      if (err) {
        logger.info('Error deleting old file');
      }
    });
  }

  //!
  const result = await prisma.$transaction(async transactionClient => {
    const isPropertyOwnerExists =
      await transactionClient.propertyOwner.findUnique({
        where: {
          propertyOwnerId,
        },
      });

    if (!isPropertyOwnerExists) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Property Owner Not Found!');
    }

    const updatedPropertyOwnerProfileData: Partial<PropertyOwner> = {};
    if (firstName) updatedPropertyOwnerProfileData['firstName'] = firstName;
    if (lastName) updatedPropertyOwnerProfileData['lastName'] = lastName;
    if (phoneNumber)
      updatedPropertyOwnerProfileData['phoneNumber'] = phoneNumber;
    if (profileImagePath)
      updatedPropertyOwnerProfileData['profileImage'] = profileImagePath;

    // ! updating
    const res = await transactionClient.propertyOwner.update({
      where: {
        propertyOwnerId,
      },
      data: updatedPropertyOwnerProfileData,
    });

    if (!res) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Property Owner Updating Failed !'
      );
    }

    return res;
  });
  return result;
};

export const PropertyOwnerServices = {
  UpdatePropertyOwner,
};
