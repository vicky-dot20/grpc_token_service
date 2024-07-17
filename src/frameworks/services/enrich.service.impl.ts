import { enrichService } from "../../application/services/enrich.service";
import {
  enrichedTokenPayloadSchema
} from "../../domain/entities/payload.entity"
import Logger from "../logger/winston.logger.impl";
const logger = new Logger();

export default class Enrich implements enrichService {
  constructor (){}
  enrichToken = async (
    payload: string,
  ): Promise<enrichedTokenPayloadSchema> =>{
try{
  const enrichPayload: enrichedTokenPayloadSchema ={
    payload: payload.toUpperCase()
  };
  return enrichPayload;
} catch (error){
  logger.error(`Error enriching token:${error}`);
  throw error;
}
  };
}