import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";
import { VALIDATION_PROTO_FILE } from "../../main/config/constants";
import { ProtoGrpcType } from "../../proto/enrichment/enrichment";
import { EnrichmentResponse } from "../../proto/enrichment/enrichmentPackage/EnrichmentResponse";
import { EnrichmentServiceHandlers } from "../../proto/enrichment/enrichmentPackage/EnrichmentService";
import { ReflectionService } from "@grpc/reflection";
import { EmptyRequest } from "../../proto/enrichment/enrichmentPackage/EmptyRequest";
import { OperationalError } from "../../domain/error/opeartional.error";
import { ERRORS, GRPC_ERRORS } from "../../frameworks/error/constants";
import { tokenCache } from "../../application/services/tokenCache";  // Import the token cache
import { manageToken } from "../../application/use_cases/manageToken";

const packageDef = protoLoader.loadSync(VALIDATION_PROTO_FILE);
const grpcObj = grpc.loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;
const enrichmentPackage = grpcObj.enrichmentPackage;
const reflection = new ReflectionService(packageDef);

export const decrptPayloadRouter = {
  service: enrichmentPackage.EnrichmentService.service,
  handlers: {
    Enrich: async (req: grpc.ServerUnaryCall<EmptyRequest, EnrichmentResponse>, callBack: grpc.sendUnaryData<EnrichmentResponse>) => {
      try {
        // Fetch the token from the cache
        await manageToken();
        const tokenData = tokenCache.getToken();
        if (!tokenData) {
          throw new Error("Token is not available in cache.");
        }

        // Return the token in the response
        callBack(null, { token: tokenData.value });
      } catch (err) {
        const error = (err as OperationalError).name as keyof typeof ERRORS;
        callBack({
          code: GRPC_ERRORS[error],
          name: (err as OperationalError).name,
          details: (err as OperationalError).toString(),
        });
      }
    },
  } as unknown as EnrichmentServiceHandlers,
  reflection: reflection,
};
