import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { itemFilterableFields } from './item.constants';
import { ItemService } from './item.service';

// !----------------------------------Create New Item---------------------------------------->>>
const createNewItem = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await ItemService.createNewItem(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item created successfully',
    data: result,
  });
});
// !----------------------------------get all Item---------------------------------------->>>
const getAllItems = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, itemFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await ItemService.getAllItems(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});
// !----------------------------------get all Item Names---------------------------------------->>>
const getAllItemNames = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, itemFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await ItemService.getAllItemNames(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------get Single Item---------------------------------------->>>
const getSingleItem = catchAsync(async (req: Request, res: Response) => {
  const { itemId } = req.params;
  const result = await ItemService.getSingleItem(itemId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item retrieved successfully',
    data: result,
  });
});
// !----------------------------------Update Item---------------------------------------->>>
const updateItemInformation = catchAsync(
  async (req: Request, res: Response) => {
    const { itemId } = req.params;
    const payload = req.body;
    const result = await ItemService.updateItemInformation(itemId, payload);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Item Updated successfully!!!!',
      data: result,
    });
  }
);

export const ItemController = {
  createNewItem,
  getAllItems,
  getSingleItem,
  updateItemInformation,
  getAllItemNames,
};
