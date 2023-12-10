import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ItemController } from './item.controller';
import { ItemValidation } from './item.validations';

const router = express.Router();

// ! Create New  item ------------------------------->>>
router.post(
  '/',
  validateRequest(ItemValidation.createItem),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  ItemController.createNewItem
);
// ! Get all item----------------------------------->>>
router.get(
  '/',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  ItemController.getAllItems
);
// ! Get all item Names----------------------------------->>>
router.get(
  '/get-all-item-names',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  ItemController.getAllItemNames
);

// ! Get Single item----------------------------------->>>
router.get(
  '/:itemId',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  ItemController.getSingleItem
);
// ! Update item----------------------------------->>>
router.patch(
  '/:itemId',
  validateRequest(ItemValidation.updateItem),
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  ItemController.updateItemInformation
);

export const ItemRoutes = router;
