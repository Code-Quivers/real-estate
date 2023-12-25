import express from 'express';

import { AuthRoutes } from '../modules/auth/auth.routes';

import { PropertiesRoutes } from '../modules/properties/properties.routes';
import { PropertyOwnerRouter } from '../modules/propertyOwner/propertyOwner.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/properties',
    route: PropertiesRoutes,
  },
  {
    path: '/property-owner',
    route: PropertyOwnerRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
