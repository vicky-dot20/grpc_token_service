"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_js_1 = require("@grpc/grpc-js");
const enrichment_pb_1 = require("../proto/enrichment_pb");
const tokenRequest_entities_1 = require("../entities/tokenRequest.entities");
const enrichPayload_1 = __importDefault(require("../use_cases/enrichPayload"));
class EnrichmentController {
    constructor() {
        this.enrichPayload = new enrichPayload_1.default();
    }
    enrich(call, callback) {
        try {
            const tokenRequest = tokenRequest_entities_1.TokenRequestSchema.parse({
                token: call.request.getToken(),
                headers: call.metadata.getMap()
            });
            const enrichedPayload = this.enrichPayload.execute(tokenRequest);
            const response = new enrichment_pb_1.Response();
            response.setEnrichedtoken(enrichedPayload.enrichedToken);
            callback(null, response);
        }
        catch (error) {
            callback({
                code: grpc_js_1.status.INVALID_ARGUMENT,
                message: error.errors.map((err) => err.message).join(', ')
            });
        }
    }
}
exports.default = EnrichmentController;
