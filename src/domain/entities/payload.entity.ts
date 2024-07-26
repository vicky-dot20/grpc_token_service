//src/domain/entities/payload.entities.ts
import { TypeOf, object, string } from "zod";

// Schema for enriched token payload
export const enrichedTokenPayloadSchema = object({
  token: string(),
  errorMessage: string()
    .nullable()
    .transform((x) => x ?? undefined),
});

export type EnrichedTokenPayload = TypeOf<typeof enrichedTokenPayloadSchema>;
