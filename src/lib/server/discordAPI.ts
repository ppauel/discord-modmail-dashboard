import { page } from "$app/stores";
import { BASE_URL } from "$env/static/private";

export enum Route {
  me = "users/@me",
  guilds = "users/@me/guilds",
}

export enum TokenType {
  Bot = "Bot",
  Bearer = "Bearer",
}

async function waitRateLimit(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function discordApiRequest(
  method: "GET" | "POST",
  route: Route | string,
  tokenType: TokenType | null,
  accessToken: string | null,
  body?: BodyInit,
  headers?: HeadersInit,
) {
  const url = new URL(`api/${route}`, BASE_URL);

  const defaultHeaders: HeadersInit = {
    Authorization: `${tokenType?.toString()} ${accessToken}`,
  };

  let response: Response;
  let tries = 0;
  let maxTries = 8;

  while (true) {
    if (tries == maxTries) throw new Error("Too many rate limits");
    response = await fetch(url, {
      method: method,
      headers: headers || defaultHeaders,
      body: body,
    });

    if (response.status === 429) {
      const retryAfter = (await response.json()).retry_after;
      console.warn(`Rate limited. Retrying after ${retryAfter} seconds...`);
      tries++;
      await waitRateLimit(retryAfter * 1000);
    } else {
      break;
    }
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
