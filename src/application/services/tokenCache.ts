// src/application/services/tokenCache.ts
import fs from 'fs';
import path from 'path';
import cache from 'memory-cache';
class TokenCache {
    private cachekey = 'authToken';


   

    getToken(): { value: string; expiration: string } | null {
        const tokenData = cache.get(this.cachekey);
        if (tokenData && new Date(tokenData.expiration) > new Date()) {
            return tokenData;
        }
        return null;
    }

    setToken(token: string, expiresIn: number) {
        const expiration = new Date(Date.now() + expiresIn * 1000).toISOString();
        const tokenData = {
            value: token,
            expiration
        };
        cache.put(this.cachekey, tokenData, expiresIn * 1000);
    }
}

const tokenCache = new TokenCache();
export { tokenCache };
