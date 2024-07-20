
//src/routes/grpc/enrichPayload.route.ts
import * as protoLoader from "@grpc/proto-loader"
import * as grpc from "@grpc/grpc-js"
import { VALIDATION_PROTO_FILE } from "../../main/config/constants"
import { ProtoGrpcType } from "../../proto/enrichment/enrichment"
import { EnrichmentResponse } from "../../proto/enrichment/enrichmentPackage/EnrichmentResponse"
import { EnrichmentServiceHandlers } from "../../proto/enrichment/enrichmentPackage/EnrichmentService"
import enrichPayloadController from "../../controllers/enrichPayload.controller"
import { ReflectionService } from "@grpc/reflection"
import { SecurePayload } from "../../domain/entities/securePayload.entity"
import { OperationalError } from "../../domain/error/opeartional.error"
import { ERRORS, GRPC_ERRORS } from "../../frameworks/error/constants"

const packageDef = protoLoader.loadSync(VALIDATION_PROTO_FILE);
const grpcObj = grpc.loadPackageDefinition(
  packageDef,
)as unknown as ProtoGrpcType;
const enrichmentPackage = grpcObj.enrichmentPackage;
const reflection = new ReflectionService(packageDef);
export const decrptPayloadRouter ={
  service: enrichmentPackage.EnrichmentService.service,
  handlers:{
    validate: async (req: { request: { payload: string } }, callBack: (arg0: null, arg1: { payload?: string; code?: grpc.status; name?: string; details?: string }) => void) => {
      const input = req.request as SecurePayload
      try {
        const result = await enrichPayloadController(input).handle<EnrichmentResponse>()

        callBack(null, { payload: JSON.stringify(result.payload) })
      } catch (err) {
        const error = (err as OperationalError).name as keyof typeof ERRORS
        callBack(null,{
          code: GRPC_ERRORS[error],
          name: (err as OperationalError).name,
          details: (err as OperationalError).tostring(),
        })
      }
    },
  } as unknown as   EnrichmentServiceHandlers,
    reflection: reflection
  };



