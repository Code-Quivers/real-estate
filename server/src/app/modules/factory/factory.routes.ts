import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FactoryController } from './factory.controller';
import { FactoryValidation } from './factory.validations';

const router = express.Router();

// ! Create New  factory ------------------------------->>>
router.post(
  '/',
  validateRequest(FactoryValidation.createFactory),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FactoryController.createNewFactory
);
// ! Get all factory----------------------------------->>>
router.get(
  '/',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FactoryController.getAllFactories
);
// ! Get all factory----------------------------------->>>
router.get(
  '/get-all-factory-names',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FactoryController.getAllFactoryName
);

// ! Get all Orders Length----------------------------------->>>
router.get(
  '/count',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FactoryController.getAllFactoriesLength
);

// ! Get Single factory----------------------------------->>>
router.get(
  '/:factoryId',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FactoryController.getSingleFactory
);
// ! Update factory----------------------------------->>>
router.patch(
  '/update/:factoryId',
  validateRequest(FactoryValidation.updateFactory),
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FactoryController.updateFactoryInformation
);

export const FactoryRoutes = router;
