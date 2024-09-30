import express from "express";
import { PaymentController } from "./payemnt.controllers";

const router = express.Router();

router.get("/", PaymentController.getPaymentReports);
router.get("/get-connected-accounts", PaymentController.getAccountFromStripe);
router.get("/with-order-id/:orderId", PaymentController.getPaymentReportsWithOrderId);
router.get("/:paymentId", PaymentController.getPaymentReport);
router.delete("/delete/:accountId", PaymentController.deleteConnectedAccount);

export const PaymentRoutes = router;
