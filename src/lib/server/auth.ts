import {
  BASE_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
} from "$env/static/private";
import type { AccessTokenExchange } from "$types";
import { discordApiRequest } from "./discordAPI";

export function generateState() {
  let randomString = "";
  const randomNumber = Math.floor(Math.random() * 10);

  for (let i = 0; i < 20 + randomNumber; i++) {
    randomString += String.fromCharCode(33 + Math.floor(Math.random() * 94));
  }

  return randomString;
}

export function authorize(state: string) {
  const url = new URL("oauth2/authorize", BASE_URL);

  // OAuth2 using code
  url.searchParams.append("response_type", "code");

  // client_id is your application's client id
  url.searchParams.append("client_id", CLIENT_ID);

  // scope is a list of OAuth2 scopes separated by url encoded spaces
  url.searchParams.append("scope", "identify guilds");

  // TODO: Add state
  // When a user begins an authorization flow on the client, a state is generated that is unique to that user's request. This value is stored somewhere only accessible to the client and the user, i.e. protected by the same-origin policy. When the user is redirected, the state parameter is returned. The client validates the request by checking that the state returned matches the stored value. If they match, it is a valid authorization request. If they do not match, it's possible that someone intercepted the request or otherwise falsely authorized themselves to another user's resources, and the request should be denied.
  url.searchParams.append("state", state);

  // When someone navigates to this URL, they will be prompted to authorize your application for the requested scopes. On acceptance, they will be redirected to your redirect_uri, which will contain an additional querystring parameter, code. state will also be returned if previously sent, and should be validated at this point.
  url.searchParams.append("redirect_uri", REDIRECT_URI);

  // prompt controls how the authorization flow handles existing authorizations. If a user has previously authorized your application with the requested scopes and prompt is set to consent, it will request them to reapprove their authorization. If set to none, it will skip the authorization screen and redirect them back to your redirect URI without requesting their authorization.
  url.searchParams.append("prompt", "none");

  return url;
}

export async function authenticate(
  code: string,
): Promise<AccessTokenExchange | null> {
  const data = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: REDIRECT_URI,
  }).toString();

  const headers: HeadersInit = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const response = await discordApiRequest(
    "POST",
    "oauth2/token",
    null,
    null,
    data,
    headers,
  );

  return response;
}
