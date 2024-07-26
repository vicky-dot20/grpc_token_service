import * as grpc from "@grpc/grpc-js";
import Logger from "../../frameworks/logger/winston.logger.impl";
import { decrptPayloadRouter } from "../../routes/grpc/enrichedPayload.route";
import { manageToken } from "../../application/use_cases/manageToken";


const PORT = 8000; // Ensure this matches your client's port
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
  
    await manageToken();
    console.log("Token successfully managed");
    logger.info("Token successfully managed");

    const server = getServer();
    const GRPC_SERVER_ADDRESS = `127.0.0.1:${PORT}`; // Use this address for local testing
    const creds = grpc.ServerCredentials.createInsecure();

    server.bindAsync(GRPC_SERVER_ADDRESS, creds, (err: Error | null, port: number) => {
      if (err) {
        console.error("Error binding server", err);
        logger.error("Error binding server", err);
        cleanup(server);
        return;
      }
      server.start();
      console.log(`Server started on ${GRPC_SERVER_ADDRESS}`);
      logger.info(`Server started on ${GRPC_SERVER_ADDRESS}`);
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

