// src/application/use_cases/manageToken.ts
import { getAuthToken } from '../services/authService';
import { tokenCache } from '../services/tokenCache';
import { isTokenValid } from '../services/tokenValidation';
import fs from 'fs';
import path from 'path';

async function manageToken() {
    if (!isTokenValid()) {
        const authResult = await getAuthToken();
        tokenCache.setToken(authResult.token, authResult.expiresIn);
    }

    const tokenData = tokenCache.getToken();
    if (!tokenData) {
        throw new Error("Failed to retrieve a valid token.");
    }

    console.log("Token managed successfully:", tokenData);
}

export { manageToken };