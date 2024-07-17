import * as protoLoader from "@grpc/proto-loader"
import * as grpc from "@grpc/grpc-js"
import { VALIDATION_PROTO_FILE } from "../../main/config/constants"
import { ProtoGrpcType } from "../../proto/enrichment/enrichment"
import { EnrichmentResponse } from "../../proto/enrichment/enrichmentPackage/EnrichmentResponse"
import { EnrichmentServiceHandlers } from "../../proto/enrichment/enrichmentPackage/EnrichmentService"
import enrichPayloadController from "../../controllers/enrichPayload.controller"
import { ReflectionService } from "@grpc/reflection"

const packageDef = protoLoader.loadSync(VALIDATION_PROTO_FILE);
const grpcObj = grpc.loadPackageDefinition(
  packageDef,
)as unknown as ProtoGrpcType;
const enrichmentPackage = grpcObj.enrichmentPackage;
const reflection = new ReflectionService(packageDef);


