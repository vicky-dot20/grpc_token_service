// src/application/services/tokenValidation.ts
import { tokenCache } from './tokenCache';

export function isTokenValid(): boolean {
    const tokenData = tokenCache.getToken();
    if (!tokenData) {
        return false;
    }

    const expirationDate = new Date(tokenData.expiration);
    return expirationDate > new Date();
}
