"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnrichPayload {
    execute(tokenRequest) {
        const generatedToken = `provider-generated-${tokenRequest.token}`;
        return {
            ...tokenRequest,
            enrichedToken: `enriched-${generatedToken}`
        };
    }
}
exports.default = EnrichPayload;
