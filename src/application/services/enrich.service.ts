import { SecurePayload } from "../../domain/entities/securePayload.entity";

export interface EnrichService {
  enrichToken: (payload: SecurePayload) => Promise<{ token: string } | undefined>;
}
