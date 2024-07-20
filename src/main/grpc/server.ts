// src/main/grpc/server.ts
import * as grpc from "@grpc/grpc-js";
import Logger from "../../frameworks/logger/winston.logger.impl";
import { decrptPayloadRouter } from "../../routes/grpc/enrichedPayload.route";
import { manageToken } from "../../application/use_cases/manageToken";
import { isTokenValid } from "../../application/services/tokenValidation";

const PORT = 8000;
const logger = new Logger();

const cleanup = (server: grpc.Server) => {
  server.tryShutdown((err?: Error) => {
    if (err) {
      console.error("Server shutdown failed", err);
      logger.error("Server shutdown failed", err);
    } else {
      console.warn("Server cleanup completed!");
      logger.warning("Server cleanup completed!");
    }
  });
};

const getServer = () => {
  const server = new grpc.Server();
  server.addService(decrptPayloadRouter.service, decrptPayloadRouter.handlers);
  decrptPayloadRouter.reflection.addToServer(server);
  return server;
};

const main = async () => {
  try {
    if (isTokenValid()) {
      console.log("Token is still valid. No need to restart the server.");
      logger.info("Token is still valid. No need to restart the server.");
      process.exit(0); // Exit the process if the token is valid
    }

    // Manage token if it's not valid or doesn't exist
    await manageToken();
    console.log("Token successfully managed");
    logger.info("Token successfully managed");

    const server = getServer();
    const host = `0.0.0.0:${PORT}`;
    const creds = grpc.ServerCredentials.createInsecure();

    server.bindAsync(host, creds, (err: Error | null, port: number) => {
      if (err) {
        console.error("Error binding server", err);
        logger.error("Error binding server", err);
        cleanup(server);
        return;
      }
      server.start();
      console.log(`Server started on port ${port}`);
      logger.info(`Server started on port ${port}`);
    });

    process.on("SIGINT", () => {
      console.log("Caught interrupt signal, shutting down gracefully.");
      logger.info("Caught interrupt signal, shutting down gracefully.");
      cleanup(server);
    });

    process.on("SIGTERM", () => {
      console.log("Caught terminate signal, shutting down gracefully.");
      logger.info("Caught terminate signal, shutting down gracefully.");
      cleanup(server);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to manage token", error);
      logger.error("Failed to manage token", error);
    } else {
      console.error(
        "Failed to manage token, unknown error",
        new Error(String(error))
      );
      logger.error(
        "Failed to manage token, unknown error",
        new Error(String(error))
      );
    }
    process.exit(1); // Exit the process with a failure code
  }
};

main();
