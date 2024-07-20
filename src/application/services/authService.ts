// src/application/services/authService.ts
import axios from 'axios';
import { config } from 'dotenv';
config();

async function getAuthToken() {
    const clientId = process.env.PING_IDENTITY_CLIENT_ID!;
    const clientSecret = process.env.PING_IDENTITY_CLIENT_SECRET!;
    const environmentId = process.env.PING_IDENTITY_ENVIRONMENT_ID!;
    const tokenEndpoint = `https://auth.pingone.com.au/${environmentId}/as/token`;

    const authHeader = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;
    const params = new URLSearchParams({
        grant_type: 'client_credentials'
    });

    try {
        const response = await axios.post(tokenEndpoint, params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': authHeader
            }
        });
        return { token: response.data.access_token, expiresIn: response.data.expires_in };
    } catch (error) {
        console.error('Failed to retrieve token:', error);
        throw new Error('Authentication failed');
    }
}
export { getAuthToken };
