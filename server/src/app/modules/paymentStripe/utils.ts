// import { TokenManager } from "./paypal.tokenManager";

import { TokenManager } from "./stripe.tokenManager";

export const generateAccessTokenForPaypal = async (
  baseUrl: string,
  clientId: string,
  clientSecret: string,
): Promise<string> => {
  const timeStamp = Math.floor(Date.now() / 1000);
  const tokenManager: TokenManager = new TokenManager();
  if (tokenManager.isTokenValid()) {
    console.log("Token from file.............");
    return tokenManager.getToken();
  }

  console.log("Token from api..........");
  const token_url = `${baseUrl}/v1/oauth2/token`;
  try {
    if (!clientId || !clientSecret) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(clientId + ":" + clientSecret).toString("base64");

    const response = await fetch(token_url, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();

    // console.log('generating access token', data);
    if (data?.access_token) {
      tokenManager.addToken(data.access_token, data.expires_in, timeStamp);
    }

    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
    return "";
  }
};
