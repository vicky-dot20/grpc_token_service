import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { EnrichmentServiceClient as _enrichmentPackage_EnrichmentServiceClient, EnrichmentServiceDefinition as _enrichmentPackage_EnrichmentServiceDefinition } from './enrichmentPackage/EnrichmentService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  enrichmentPackage: {
    EmptyRequest: MessageTypeDefinition
    EnrichmentResponse: MessageTypeDefinition
    EnrichmentService: SubtypeConstructor<typeof grpc.Client, _enrichmentPackage_EnrichmentServiceClient> & { service: _enrichmentPackage_EnrichmentServiceDefinition }
  }
}

