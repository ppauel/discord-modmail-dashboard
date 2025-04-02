import { Route, TokenType, discordApiRequest } from "$lib/server/discordAPI";
import type { OAuthCurrentUserGuild } from "$types";
import { error, type Handle, type HandleServerError } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  console.log("Hook called:", event.url.pathname.toString());

  // Read cookies
  const accessToken = event.cookies.get("discord_access_token");
  const refreshToken = event.cookies.get("discord_refresh_token");

  // Set local user if access token is present
  // TODO: Cache (server side)
  if (accessToken) {
    const getUser = await discordApiRequest(
      "GET",
      Route.me,
      TokenType.Bearer,
      accessToken,
    );

    const newUser = {
      id: getUser.id,
      username: getUser.username,
    };

    event.locals.user = newUser;

    console.log("Authenticated by Discord");
  }

  // Always fetch servers (& permissions!) if logged in & trying to access anything beyond /dashboard or corresponding api
  if (
    event.url.pathname.startsWith("/dashboard") ||
    event.url.pathname.startsWith("/api/servers")
  ) {
    if (!event.locals.user) error(401, "Not logged in");

    const guilds: OAuthCurrentUserGuild[] = await discordApiRequest(
      "GET",
      Route.guilds,
      TokenType.Bearer,
      accessToken!,
    ).catch((e: Error) => {
      error(500, e.message);
    });

    event.locals.servers = Array.from(guilds);
  }

  const response = await resolve(event);
  console.log("Event resolved.");
  return response;
};
