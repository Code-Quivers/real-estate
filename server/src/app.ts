import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./app/routes";
import cookieParser from "cookie-parser";
import create_required_directories from "./tasks/directory_creation_task";
import { setupSocket } from "./socket";
import { createServer } from "http";
import { infoLogger } from "./shared/logger";
import check_payment_status_tasks from "./tasks/check_payment_status_tasks";
import cron from "node-cron";
import delete_expired_reset_links from "./tasks/delete_expired_reset_links";
import check_due_rent_tasks from "./tasks/check_due_rent_tasks";
// import check_due_rent_tasks from "./tasks/check_due_rent_tasks";

//
const baseURL = "/backend/api/v1";
const app: Application = express();

// Create required directories
create_required_directories();

// task

// // Schedule the status check to run every 30 sec for test
// cron.schedule("*/30 * * * * *", () => {
//   infoLogger.info("Checking payment status...");
//   check_payment_status_tasks();
// });

// Schedule the status check to run every 1 minute sec for test
cron.schedule("0 */6 * * *", () => {
  infoLogger.info("Checking Payment status...");
  check_payment_status_tasks();
});
// Schedule the status check to run every 12 hour

cron.schedule("0 */12 * * *", () => {
  infoLogger.info("Checking Delete status...");
  delete_expired_reset_links();
  //

  //
  infoLogger.info("Checking Due rent Status....");
  check_due_rent_tasks();
});

//

// Start the database backup task
// dbBackupTask.start();

app.use(
  cors({
    // origin: 'http://85.31.225.190:3100',
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://77.237.234.238:3000",
      "https://77.237.234.238:3000",
      "http://managerentalunit.com",
      "https://managerentalunit.com",
    ],
    credentials: true,
    // methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  }),
);
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Socket
// call the socket io setup function
const server = createServer(app);
setupSocket(server);

server.listen(4000, () => infoLogger.info(`Socket is running on port ${4000}`));

//
app.use(baseURL, express.static("data/uploads"));
app.use(baseURL, routes);

//global error handler
app.use(globalErrorHandler);

//handle not found

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
