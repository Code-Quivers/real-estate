import express from 'express';
import { PropertyController } from './property.controllers';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';

const router = express.Router();

router.post(
  '/add',
  auth(UserRoles.PROPERTY_OWNER),
  FileUploadHelper.uploadPropertyImages.array('files'),
  PropertyController.addProperty
);
router.get(
  '/all',
  auth(
    UserRoles.PROPERTY_OWNER,
    UserRoles.SERVICE_PROVIDER,
    UserRoles.SUPERADMIN,
    UserRoles.TENANT
  ),
  PropertyController.getAllProperty
);
router.get(
  '/single/:propertyId',
  auth(
    UserRoles.PROPERTY_OWNER,
    UserRoles.SERVICE_PROVIDER,
    UserRoles.SUPERADMIN,
    UserRoles.TENANT
  ),
  PropertyController.getPropertyInfo
);

export const PropertyRoutes = router;
