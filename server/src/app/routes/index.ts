import express from 'express';

import { AuthRoutes } from '../modules/auth/auth.routes';


import { UserRoutes } from '../modules/users/user.routes';
// import { PropertyRoutes } from '../modules/property/property.routes';
import { PropertyOwnerRouter } from '../modules/property_owner/propertyOwner.routes';

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
    path: '/property-owner',
    route: PropertyOwnerRouter,
  },
  // {
  //   path: '/property',
  //   route: PropertyRoutes,
  // },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
