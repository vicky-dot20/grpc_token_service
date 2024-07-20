
//src/domain/entities/payload.entity.ts

import { TypeOf,object,record,string,unknown } from "zod";

export const enrichedTokenPayloadSchema  =object({
      payload: string().optional(),
      errorMessage: string()
      .nullable()
      .transform((x) => x ?? undefined ),
});

export type enrichedTokenPayloadSchema = TypeOf<typeof enrichedTokenPayloadSchema>;