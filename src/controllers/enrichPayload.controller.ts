
// src/controllers/enrichPayload.controller.ts
import { enrichedTokenPayload } from "../application/use_cases/enrich.usecase";
import { SecurePayload } from "../domain/entities/securePayload.entity";
import { ApplicationErrorFactoryImpl } from "../frameworks/error/applicationError.factory.impl";
import Logger from "../frameworks/logger/winston.logger.impl"
import Enrich from "../frameworks/services/enrich.service.impl"


const enrichPayloadController = (input: SecurePayload)=>{
  const handle = async <O>(): Promise<O> =>{
    const logger = new Logger();
    const context = {
      enrich: new Enrich(),
      errorFactory: new ApplicationErrorFactoryImpl(),
      logger: logger,
    }
    const usecase = new enrichedTokenPayload(input,context);
    const result = usecase.execute()
    ;
    return result as O;
  }
  return Object.freeze({handle});
}

export default enrichPayloadController;