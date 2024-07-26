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

    const tokenDir = path.resolve(__dirname, '../../../cache/tokens');
    const tokenFilePath = path.join(tokenDir, 'token.json');  // Storing in a JSON file
    console.log("Managing token...");
    // Ensure the directory exists
    if (!fs.existsSync(tokenDir)) {
        fs.mkdirSync(tokenDir, { recursive: true });
    }

    // Write the token to the file
    fs.writeFileSync(tokenFilePath, JSON.stringify(tokenData), { encoding: 'utf8' });
}

export { manageToken };
