import { EnrichService } from "../../application/services/enrich.service";
import { EnrichmentResponse } from "../../proto/enrichment/enrichmentPackage/EnrichmentResponse";

class Enrich implements EnrichService {
  async enrichToken(payload: { token: string }): Promise<{ token: string } | undefined> {
    // Implementation here
    // Ensure this method matches the updated interface
    return { token: payload.token }; // Example implementation
  }
}

export default Enrich;
