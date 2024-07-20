// src/frameworks/services/enrich.service.impl.ts
import { enrichService } from "../../application/services/enrich.service";
import { enrichedTokenPayloadSchema } from "../../domain/entities/payload.entity";
import Logger from "../logger/winston.logger.impl";

const logger = new Logger();

export default class Enrich implements enrichService {
    enrichToken = async (payload: string): Promise<enrichedTokenPayloadSchema> => {
        try {
            const enrichPayload: enrichedTokenPayloadSchema = {
                payload: payload.toUpperCase()
            };
            return enrichPayload;
        } catch (error) {
            // Combine message and error details into one string
            logger.error(`Error enriching token: ${error instanceof Error ? error.message : error}`);
            throw error;
        }
    };
}
