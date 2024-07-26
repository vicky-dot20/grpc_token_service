//src/domain/entities/securepayload.entities.ts
import { TypeOf, object, string } from "zod";

// Schema for secure payload
export const SecurePayloadschema = object({
  token: string({
    required_error: "Token string is required to attempt cache storage"
  }),
});

export type SecurePayload = TypeOf<typeof SecurePayloadschema>;
