import { CLIENT_TOKEN } from "$env/static/private";
import { TokenType, discordApiRequest } from "$lib/server/discordAPI";
import { json } from "@sveltejs/kit";
import type { APIUser } from "discord-api-types/v10";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals, params }) => {
  if (!locals.user)
    return new Response(null, { status: 401, statusText: "Not logged in" });

  const user = await discordApiRequest(
    "GET",
    `users/${params.user}`,
    TokenType.Bot,
    CLIENT_TOKEN,
  )
    .then((u: APIUser) => {
      return json(u, { status: 200 });
    })
    .catch((e: Error) => {
      return new Response(null, { status: 500, statusText: e.message });
    });

  return user;
};
