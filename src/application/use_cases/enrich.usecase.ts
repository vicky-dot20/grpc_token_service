//src/application/usecase/enrich.usecase.ts
import { SecurePayload } from "../../domain/entities/securePayload.entity";
import {
  ApplicationErrorFactory,
  ErrorTypes,
} from "../../domain/error/applicationError.factory";
import { LoggerService } from "../services/logger.service";
import { EnrichService } from "../services/enrich.service";
import { Usecase } from "./usecase";
import { OperationalError } from "../../domain/error/opeartional.error";

type Context = {
  enrich: EnrichService;
  errorFactory: ApplicationErrorFactory;
  logger: LoggerService;
};

export class EnrichedTokenPayloadUsecase implements Usecase<SecurePayload, Context, { token: string } | ErrorTypes> {
  constructor(public readonly input: SecurePayload, public readonly context: Context) {}

  execute = async (): Promise<{ token: string } | ErrorTypes> => {
    try {
      const enrichedToken = await this.context.enrich.enrichToken(this.input);
      this.context.logger.info("Token enrichment successful");
      return { token: enrichedToken?.token ?? "" };
    } catch (error) {
      this.context.logger.error("Token enrichment failed");
      if (error instanceof OperationalError) {
        return ErrorTypes.UNKNOWN;
      }
      return ErrorTypes.UNKNOWN;
    }
  };
}