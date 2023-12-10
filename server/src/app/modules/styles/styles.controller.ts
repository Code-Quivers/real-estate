import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IRequestUser } from '../users/user.interface';
import { stylesFilterableFields } from './styles.constants';
import { StylesService } from './styles.service';

const createNewStyle = catchAsync(async (req: Request, res: Response) => {
  const profileId = (req.user as IRequestUser).profileId;
  const result = await StylesService.createNewStyle(profileId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Style created Successfully',
    data: result,
  });
});
const getAllStyles = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, stylesFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await StylesService.getAllStyles(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'styles fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getAllStyleNumbers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, stylesFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await StylesService.getAllStyleNumbers(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'styles fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleStyle = catchAsync(async (req: Request, res: Response) => {
  const { styleNo } = req.params;
  const result = await StylesService.getSingleStyle(styleNo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'style retrieved successfully',
    data: result,
  });
});
const updateStyleInformation = catchAsync(
  async (req: Request, res: Response) => {
    const { styleNo } = req.params;
    const result = await StylesService.updateStyleInformation(styleNo, req);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'style Updated successfully',
      data: result,
    });
  }
);

// factory style assign
const factoryStyleAssign = catchAsync(async (req: Request, res: Response) => {
  const result = await StylesService.factoryStyleAssign(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Factory Assigned Successfully',
    data: result,
  });
});
// !getAllStylesRecentComments
const getAllStylesRecentComments = catchAsync(
  async (req: Request, res: Response) => {
    const result = await StylesService.getAllStylesRecentComments();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Recent Top Ten Comments on styles fetched successfully',
      data: result,
    });
  }
);

// !----------------------------------get all Stylish---------------------------------------->>>
const getAllStylishLength = catchAsync(async (req: Request, res: Response) => {
  const result = await StylesService.getAllStylishLength();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Style Count fetched successfully',
    data: result,
  });
});

export const StylesController = {
  createNewStyle,
  getAllStyles,
  getSingleStyle,
  updateStyleInformation,
  getAllStyleNumbers,
  factoryStyleAssign,
  getAllStylishLength,
  getAllStylesRecentComments,
};
