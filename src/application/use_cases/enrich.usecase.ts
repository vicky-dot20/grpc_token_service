import { SecurePayload } from "../../domain/entities/securePayload.entity";
import {
  ApplicationErrorFactory,
  ErrorTypes
} from "../../domain/error/applicationError.factory"
import { enrichedTokenPayloadSchema } from "../../domain/entities/payload.entity";
import { LoggerService } from "../services/logger.service";
import { enrichService } from "../services/enrich.service";
import { Usecase } from "./usecase";
type Context ={
  enrich: enrichService;
  errorFactory: ApplicationErrorFactory;
  logger :LoggerService;
}

export class enrichedTokenPayload implements Usecase<SecurePayload,Context,enrichedTokenPayloadSchema>
{
  constructor(
    public readonly input : SecurePayload,
    public readonly context : Context,
  ){}

  execute=async(): Promise< enrichedTokenPayloadSchema | ErrorTypes>=>{
    const token = this.input.payload;
    const enrichedToken = await this.context.enrich.enrichToken(token)
    this.context.logger.info(
      "token enrichment passed"
    )
    return {payload: enrichedToken?.payload};

  }
}