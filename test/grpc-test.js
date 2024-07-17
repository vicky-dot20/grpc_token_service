import grpc from 'k6/net/grpc';
import { check } from 'k6';

const client = new grpc.Client();
client.load(['proto'], 'enrichment.proto');

export default function () {
  client.connect('localhost:50052', {
    plaintext: true,
  });

  const data = { token: 'test-token' };

  const response = client.invoke('enrichment.EnrichmentService/Enrich', data);

  check(response, {
    'status is OK': (r) => r && r.status === grpc.StatusOK,
    'enriched token is correct': (r) => r && r.message.enrichedToken === 'enriched-provider-generated-test-token',
  });

  client.close();
}
