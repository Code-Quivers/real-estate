import express from 'express';
import { TenantControllers } from './tenant.controllers';
import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';

const router = express.Router();

router.get(
  '/get-all-tenants',
  auth(
    UserRoles.PROPERTY_OWNER,
    UserRoles.PROPERTY_OWNER,
    UserRoles.SERVICE_PROVIDER,
    UserRoles.SUPERADMIN
  ),
  TenantControllers.getAllTenants
);

export const TenantRouters = router;
