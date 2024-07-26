// src/application/services/tokenValidation.ts
import { tokenCache } from './tokenCache';

export function isTokenValid(): boolean {
    const tokenData = tokenCache.getToken();
    if (!tokenData) {
        return false;
    }
    console.log("Checking if token is valid...");
    const expirationDate = new Date(tokenData.expiration);
    return expirationDate > new Date();
}
