import express from "express";
import { PaymentController } from "./payemnt.controllers";

const router = express.Router();

router.get("/", PaymentController.getPaymentReports);
router.get("/with-order-id/:orderId", PaymentController.getPaymentReportsWithOrderId);
router.get("/:paymentId", PaymentController.getPaymentReport);

export const PaymentRoutes = router;
