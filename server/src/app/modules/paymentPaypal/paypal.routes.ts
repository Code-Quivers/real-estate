import express, { NextFunction, Request, Response } from 'express';


import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';
import PaypalController from './paypal.controllers';
// import { PaypalController } from "./paypal.controllers";


const router = express.Router();

// paypal payment request route
router.post('/pay', auth(UserRoles.TENANT, UserRoles.PROPERTY_OWNER), PaypalController.payForOrder);
router.post('/capture', auth(UserRoles.TENANT, UserRoles.PROPERTY_OWNER), PaypalController.paymentCapture);

export const PaypalRoutes = router;