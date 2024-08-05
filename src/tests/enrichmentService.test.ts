import * as grpc from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/enrichment/enrichment";
import { GRPC_SERVER_ADDRESS, VALIDATION_PROTO_FILE } from "../main/config/constants";
import { manageToken } from "../application/use_cases/manageToken";
import { tokenCache } from "../application/services/tokenCache";
import { decrptPayloadRouter } from "../routes/grpc/enrichedPayload.route";

// Load the protobuf definition
const packageDef = loadSync(VALIDATION_PROTO_FILE);
const grpcObj = grpc.loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;
const enrichmentPackage = grpcObj.enrichmentPackage;

jest.mock('../application/services/tokenCache', () => ({
    tokenCache: {
        clear: jest.fn(),
        setToken: jest.fn(),
        getToken: jest.fn(),
    },
}));

jest.mock('../application/use_cases/manageToken', () => ({
    manageToken: jest.fn(),
}));

describe("EnrichmentService", () => {
    let server: grpc.Server;
    let client: any;

    beforeAll((done) => {
        server = new grpc.Server();
        server.addService(decrptPayloadRouter.service, decrptPayloadRouter.handlers);

        const creds = grpc.ServerCredentials.createInsecure();
        server.bindAsync(GRPC_SERVER_ADDRESS, creds, (err: Error | null, port: number) => {
            if (err) {
                done(err);
                return;
            }
            server.start();
            client = new enrichmentPackage.EnrichmentService(GRPC_SERVER_ADDRESS, grpc.credentials.createInsecure());
            done();
        });
    });

    afterAll((done) => {
        server.tryShutdown(done);
    });

    beforeEach(() => {
        // Clear token cache before each test
        (tokenCache.clear   as jest.Mock).mockClear();
        (tokenCache.setToken as jest.Mock).mockClear();
        (tokenCache.getToken as jest.Mock).mockClear();
        (manageToken as jest.Mock).mockClear();
    });

    test("should return token when valid token is cached", (done) => {
        // Mock getToken to return a valid token
        const fakeToken = { value: "test-token", expiration: new Date(Date.now() + 3600 * 1000).toISOString() };
        (tokenCache.getToken as jest.Mock).mockReturnValue(fakeToken);

        client.Enrich({}, (err: grpc.ServiceError | null, response: any) => {
            // Check if there's no error
            expect(err).toBeNull();
            
            // Check if the response contains the expected token
            expect(response).toBeDefined();
            expect(response.token).toBe(fakeToken.value);
            
            // Check the complete structure of the response if necessary
            expect(response).toEqual({ token: fakeToken.value });
            done();
        });
    });

    test("should return error when token is not available", (done) => {
        // Mock getToken to return null (no token available)
        (tokenCache.getToken as jest.Mock).mockReturnValue(null);

        client.Enrich({}, (err: grpc.ServiceError | null, response: any) => {
            // Check if there's an error
            expect(err).not.toBeNull();
            expect(response).toBeUndefined();
            done();
        });
    });

    test("should return error when manageToken fails", (done) => {
        // Mock manageToken to throw an error
        (manageToken as jest.Mock).mockImplementation(() => {
            throw new Error("Token management failed");
        });

        client.Enrich({}, (err: grpc.ServiceError | null, response: any) => {
            // Check if there's an error
            expect(err).not.toBeNull();
            expect(response).toBeUndefined();
            done();
        });
    });
});
