import express from 'express';
import { ServicesController } from './services.controller';
import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';
import validateRequest from '../../middlewares/validateRequest';
import { ServicesValidation } from './services.validation';

const router = express.Router();

router.post(
  '/create-service',
  auth(UserRoles.SERVICE_PROVIDER),
  validateRequest(ServicesValidation.createService),
  ServicesController.createNewProperty
);
// get all property
router.get(
  '/all',
  auth(
    UserRoles.PROPERTY_OWNER,
    UserRoles.SERVICE_PROVIDER,
    UserRoles.SUPERADMIN,
    UserRoles.TENANT
  ),
  ServicesController.getAllProperty
);

// get single property info

router.get(
  '/single/:propertyId',
  auth(
    UserRoles.PROPERTY_OWNER,
    UserRoles.SERVICE_PROVIDER,
    UserRoles.SUPERADMIN,
    UserRoles.TENANT
  ),
  ServicesController.getSinglePropertyInfo
);
// ! update property info

export const PropertiesRoutes = router;
