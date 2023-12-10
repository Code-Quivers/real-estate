import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrdersController } from './orders.controller';
import { OrdersValidation } from './orders.validations';

const router = express.Router();

// ! Create New  Order ------------------------------->>>
router.post(
  '/',
  validateRequest(OrdersValidation.createOrder),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  OrdersController.createNewOrder
);
// ! Get all Orders----------------------------------->>>
router.get(
  '/',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  OrdersController.getAllOrders
);
router.get(
  '/style-wise-orders',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  OrdersController.styleWiseOrderLists
);

// ! Get Single Order----------------------------------->>>
router.get(
  '/order-info/:orderNo',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  OrdersController.getSingleOrder
);
// ! Update Order----------------------------------->>>
router.patch(
  '/update/:orderNo',
  validateRequest(OrdersValidation.updateOrder),
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  OrdersController.updateOrder
);

// ! Get all Orders Length----------------------------------->>>
router.get(
  '/count',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  OrdersController.getAllOrdersLength
);

// ! Get all Orders Length----------------------------------->>>
router.get(
  '/month',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  OrdersController.getBuyerEtdStatistics
);

// ! Get all Orders Length----------------------------------->>>
router.get(
  '/pc',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  OrdersController.getAllOrdersPC
);

export const OrderRoutes = router;
