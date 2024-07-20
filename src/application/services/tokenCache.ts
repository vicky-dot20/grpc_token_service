// src/application/services/tokenCache.ts
import fs from 'fs';
import path from 'path';

class TokenCache {
    private cacheDir = path.resolve(__dirname, '../../../cache/tokens');
    private cacheFilePath = path.join(this.cacheDir, 'token.json');

    constructor() {
        this.ensureCacheDirectory();
    }

    private ensureCacheDirectory() {
        if (!fs.existsSync(this.cacheDir)) {
            fs.mkdirSync(this.cacheDir, { recursive: true });
        }
    }

    getToken(): { value: string; expiration: string } | null {
        if (fs.existsSync(this.cacheFilePath)) {
            const data = fs.readFileSync(this.cacheFilePath, 'utf8');
            try {
                const tokenData = JSON.parse(data);
                if (new Date(tokenData.expiration) > new Date()) {
                    return tokenData;
                }
            } catch (error) {
                console.error('Error parsing token data:', error);
            }
        }
        return null;
    }

    setToken(token: string, expiresIn: number) {
        const expiration = new Date(Date.now() + expiresIn * 1000).toISOString();
        const tokenData = {
            value: token,
            expiration
        };
        fs.writeFileSync(this.cacheFilePath, JSON.stringify(tokenData), { encoding: 'utf8' });
    }
}

const tokenCache = new TokenCache();
export { tokenCache };
