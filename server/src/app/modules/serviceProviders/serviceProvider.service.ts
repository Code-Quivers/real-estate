/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IServiceProviderUpdateRequest } from './serviceProvider.interfaces';
import { Request } from 'express';
import { IUploadFile } from '../../../interfaces/file';
import fs from 'fs';
import { logger } from '../../../shared/logger';
import { ServiceProvider } from '@prisma/client';

const UpdateServiceProvider = async (
  serviceProviderId: string,
  req: Request
) => {
  const profileImage: IUploadFile = req.file as any;
  // const profileImagePath = profileImage?.path?.substring(13);
  const profileImagePath = profileImage?.path;

  const {
    firstName,
    lastName,
    phoneNumber,
    oldProfileImagePath,
    companyAddress,
    companyEmailAddress,
    companyName,
    companyPhoneNumber,
  } = req.body as IServiceProviderUpdateRequest;

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
    const isServiceProviderOwnerExists =
      await transactionClient.serviceProvider.findUnique({
        where: {
          serviceProviderId,
        },
      });

    if (!isServiceProviderOwnerExists) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'Service Provider Profile Not Found!'
      );
    }

    const updatedServiceProviderProfileData: Partial<ServiceProvider> = {};
    if (firstName) updatedServiceProviderProfileData['firstName'] = firstName;
    if (lastName) updatedServiceProviderProfileData['lastName'] = lastName;
    if (phoneNumber)
      updatedServiceProviderProfileData['phoneNumber'] = phoneNumber;
    if (profileImagePath)
      updatedServiceProviderProfileData['profileImage'] = profileImagePath;
    if (companyAddress)
      updatedServiceProviderProfileData['companyAddress'] = companyAddress;
    if (companyEmailAddress)
      updatedServiceProviderProfileData['companyEmailAddress'] =
        companyEmailAddress;
    if (companyName)
      updatedServiceProviderProfileData['companyName'] = companyName;
    if (companyPhoneNumber)
      updatedServiceProviderProfileData['companyPhoneNumber'] =
        companyPhoneNumber;

    // ! updating
    const res = await transactionClient.serviceProvider.update({
      where: {
        serviceProviderId,
      },
      data: updatedServiceProviderProfileData,
    });

    if (!res) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Service Provider Profile Updating Failed !'
      );
    }

    return res;
  });
  return result;
};

export const ServiceProviderServices = {
  UpdateServiceProvider,
};
