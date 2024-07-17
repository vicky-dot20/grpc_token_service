// main/grpc/server.ts

import * as grpc from "@grpc/grpc-js"
import Logger from "../../frameworks/logger/winston.logger.impl"
import { decrptPayloadRouter} from "../../routes/grpc/enrichedPayload.route"

const PORT = 8000;
const logger = new Logger();

const cleanup= (server: grpc.Server)=>{
  logger.warning("Server cleanup!");
}

const getServer=()=>{
  const server = new grpc.Server();
  return server;
}

const main =()=>{
  const server = getServer();
  const host =`0.0.0.0:${PORT}`;
  const creds = grpc.ServerCredentials.createInsecure();
  server.addService(
    decrptPayloadRouter.service,
    decrptPayloadRouter.handlers,
  );
  decrptPayloadRouter.reflection.addToServer(server);
  process.on("SIGINFO",()=>
  {
    logger.info("Caught interupr signal")
    cleanup(server);
  })
  logger.info(server.getChannelzRef());

  server.bindAsync(host,creds,(err,_)=>{
    if(err){
      logger.error(`${err.name}: ${err.message}`);
      return cleanup(server);
    }
    logger.info(`your server stated on port 0.0.0.0:${PORT}`)
  });
};
main();