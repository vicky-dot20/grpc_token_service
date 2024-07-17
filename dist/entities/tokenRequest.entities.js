"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRequestSchema = void 0;
// entities/tokenRequest.entities.ts
const zod_1 = require("zod");
exports.TokenRequestSchema = zod_1.z.object({
    token: zod_1.z.string(),
    headers: zod_1.z.record(zod_1.z.string())
});
