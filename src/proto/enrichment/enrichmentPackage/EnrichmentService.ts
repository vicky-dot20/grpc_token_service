// Original file: proto/enrichment/enrichment.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { EmptyRequest as _enrichmentPackage_EmptyRequest, EmptyRequest__Output as _enrichmentPackage_EmptyRequest__Output } from '../enrichmentPackage/EmptyRequest';
import type { EnrichmentResponse as _enrichmentPackage_EnrichmentResponse, EnrichmentResponse__Output as _enrichmentPackage_EnrichmentResponse__Output } from '../enrichmentPackage/EnrichmentResponse';

export interface EnrichmentServiceClient extends grpc.Client {
  Enrich(argument: _enrichmentPackage_EmptyRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_enrichmentPackage_EnrichmentResponse__Output>): grpc.ClientUnaryCall;
  Enrich(argument: _enrichmentPackage_EmptyRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_enrichmentPackage_EnrichmentResponse__Output>): grpc.ClientUnaryCall;
  Enrich(argument: _enrichmentPackage_EmptyRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_enrichmentPackage_EnrichmentResponse__Output>): grpc.ClientUnaryCall;
  Enrich(argument: _enrichmentPackage_EmptyRequest, callback: grpc.requestCallback<_enrichmentPackage_EnrichmentResponse__Output>): grpc.ClientUnaryCall;
  enrich(argument: _enrichmentPackage_EmptyRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_enrichmentPackage_EnrichmentResponse__Output>): grpc.ClientUnaryCall;
  enrich(argument: _enrichmentPackage_EmptyRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_enrichmentPackage_EnrichmentResponse__Output>): grpc.ClientUnaryCall;
  enrich(argument: _enrichmentPackage_EmptyRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_enrichmentPackage_EnrichmentResponse__Output>): grpc.ClientUnaryCall;
  enrich(argument: _enrichmentPackage_EmptyRequest, callback: grpc.requestCallback<_enrichmentPackage_EnrichmentResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface EnrichmentServiceHandlers extends grpc.UntypedServiceImplementation {
  Enrich: grpc.handleUnaryCall<_enrichmentPackage_EmptyRequest__Output, _enrichmentPackage_EnrichmentResponse>;
  
}

export interface EnrichmentServiceDefinition extends grpc.ServiceDefinition {
  Enrich: MethodDefinition<_enrichmentPackage_EmptyRequest, _enrichmentPackage_EnrichmentResponse, _enrichmentPackage_EmptyRequest__Output, _enrichmentPackage_EnrichmentResponse__Output>
}
