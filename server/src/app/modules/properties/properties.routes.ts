import express, { NextFunction, Request, Response } from 'express';
import { PropertiesController } from './properties.controller';
import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { PropertiesValidation } from './properties.validation';
// import { UserRoles } from '@prisma/client';
// import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create',
  auth(UserRoles.PROPERTY_OWNER),
  FileUploadHelper.uploadPropertyImages.array('files'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = PropertiesValidation.createProperty.parse(
      JSON.parse(req.body.data)
    );
    return PropertiesController.createNewProperty(req, res, next);
  }
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
  PropertiesController.getAllProperty
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
  PropertiesController.getSinglePropertyInfo
);

export const PropertiesRoutes = router;
