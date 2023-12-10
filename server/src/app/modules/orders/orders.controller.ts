import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IRequestUser } from '../users/user.interface';
import { ordersFilterableFields } from './orders.constants';
import { OrderService } from './orders.service';

// !----------------------------------Create New Order---------------------------------------->>>
const createNewOrder = catchAsync(async (req: Request, res: Response) => {
  const profileId = (req.user as IRequestUser).profileId;
  const payload = req.body;
  const result = await OrderService.createNewOrder(profileId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});
// !----------------------------------get all orders---------------------------------------->>>
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ordersFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await OrderService.getAllOrders(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------get Single order---------------------------------------->>>
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderNo } = req.params;
  const result = await OrderService.getSingleOrder(orderNo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  });
});
// !----------------------------------Update Order---------------------------------------->>>
const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderNo } = req.params;
  const payload = req.body;
  const result = await OrderService.updateOrder(orderNo, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PO Updated successfully!!!!',
    data: result,
  });
});

// !----------------------------------Style wise  Order List---------------------------------------->>>

const styleWiseOrderLists = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ordersFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await OrderService.styleWiseOrderLists(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------get all orders---------------------------------------->>>
const getAllOrdersLength = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrdersLength();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders Count fetched successfully',
    data: result,
  });
});

// !----------------------------------get all orders statistics---------------------------------------->>>
const getBuyerEtdStatistics = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrderService.getBuyerEtdStatistics();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Monthly Orders Count fetched successfully',
      data: result,
    });
  }
);

// !----------------------------------get all orders statistics---------------------------------------->>>
const getAllOrdersPC = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrdersPC();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Total Pc fetched successfully',
    data: result,
  });
});

export const OrdersController = {
  createNewOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  styleWiseOrderLists,
  getAllOrdersLength,
  getBuyerEtdStatistics,
  getAllOrdersPC,
};
