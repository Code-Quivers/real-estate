import express from 'express';

import { NotificationController } from './notification.controllers';

const router = express.Router();

router.get(
  '/',
  //   auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  NotificationController.getPPNotifications
);

export const NotificationRoutes = router;
