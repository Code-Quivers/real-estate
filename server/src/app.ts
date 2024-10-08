import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./app/routes";
import cookieParser from "cookie-parser";
import create_required_directories from "./tasks/directory_creation_task";
import { setupSocket } from "./socket";
import { createServer } from "http";

const baseURL = '/backend/api/v1';
const app: Application = express();

// Create required directories
create_required_directories();

// Start the database backup task
// dbBackupTask.start();

app.use(
  cors({
    // origin: 'http://85.31.225.190:3100',
    origin: [
      "http://localhost:3000",
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
server.listen(4000, () => console.log("Socket is Running"));

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
