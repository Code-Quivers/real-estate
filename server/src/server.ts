import { Server } from "http";
import app from "./app";
import config from "./config";
import { errorLogger, infoLogger } from "./shared/logger";

async function bootstrap() {
  const server: Server = app.listen(config.port, () => {
    infoLogger.info(`Server running on port ${config.port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        errorLogger.error("Server closed");
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    errorLogger.error(error);
    exitHandler();
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);
}

bootstrap();
