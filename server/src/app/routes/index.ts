import express from 'express';
import { BulkProductionStatusRoutes } from '../modules/BulkProductionStatus/BulkProductionStatus.routes';
import { ItemRoutes } from '../modules/Items/item.routes';
import { LdCpAopStatusRoutes } from '../modules/LdCpAopStatus/LdCpAopStatus.routes';
import { PPStrikeOffStatusRoutes } from '../modules/PPStrikeOffStatus/PPStrikeOffStatus.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CourierRoutes } from '../modules/courier/courier.routes';
import { FactoryRoutes } from '../modules/factory/factory.routes';
import { NotificationRoutes } from '../modules/notification/notification.routes';
import { OrderRoutes } from '../modules/orders/orders.routes';
import { PortRoutes } from '../modules/port/port.routes';
import { PPSubmissionRoutes } from '../modules/ppSubmission/ppSubmission.routes';
import { StyleRoutes } from '../modules/styles/styles.routes';
import { TackPackRoutes } from '../modules/tackPack/tackPack.routes';
import { UserRoutes } from '../modules/users/user.routes';

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
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/styles',
    route: StyleRoutes,
  },
  {
    path: '/factories',
    route: FactoryRoutes,
  },
  {
    path: '/ports',
    route: PortRoutes,
  },
  {
    path: '/pp-status',
    route: PPStrikeOffStatusRoutes,
  },
  {
    path: '/bulk-status',
    route: BulkProductionStatusRoutes,
  },
  {
    path: '/ld-cp-aop-status',
    route: LdCpAopStatusRoutes,
  },
  {
    path: '/courier',
    route: CourierRoutes,
  },
  {
    path: '/items',
    route: ItemRoutes,
  },
  {
    path: '/pp-submission',
    route: PPSubmissionRoutes,
  },
  {
    path: '/tack-pack',
    route: TackPackRoutes,
  },
  {
    path: '/notification',
    route: NotificationRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
