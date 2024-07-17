import path from "path";
import { config } from "dotenv";

config(
  {
    path:`.env.${process.env.NODE_ENV ?? "local"}`,
  }
);
export const LOG_LEVEL = process.env.LOG_LEVEL?.toLowerCase()
export const VALIDATION_PROTO_FILE = path.resolve(
  __dirname,
  "../../../proto/enrichment/enrichment.proto",
)