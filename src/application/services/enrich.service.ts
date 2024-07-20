//src/application/services/enrich.service.ts
import { enrichedTokenPayloadSchema } from "../../domain/entities/payload.entity";

export interface enrichService {
  enrichToken :(
    payload : string,
  )=>Promise<enrichedTokenPayloadSchema| undefined>;
}