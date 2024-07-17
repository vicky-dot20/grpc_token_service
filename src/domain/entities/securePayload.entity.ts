import { TypeOf,object,string } from "zod";

export const SecurePayloadschema = object({
  payload: string({
    required_error: "payload string is rquried to attemmpt chache storage "
  }),
});

export type SecurePayload = TypeOf< typeof SecurePayloadschema>;