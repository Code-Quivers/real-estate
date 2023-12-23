import express from 'express';

import { AuthRoutes } from '../modules/auth/auth.routes';

import { UserRoutes } from '../modules/users/user.routes';
import { PropertyRoutes } from '../modules/property/property.routes';
import { PropertiesRoutes } from '../modules/properties/properties.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },

  {
    path: '/property',
    route: PropertyRoutes,
  },
  {
    path: '/properties',
    route: PropertiesRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
