import { map } from "$lib/client/helpers";
import { hasAccess } from "$lib/client/permissions";
import db from "$lib/server/database";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals, params, url }) => {
  const server = locals.servers?.find((g: any) => g.id === params.server);

  if (!server)
    return new Response(null, { status: 404, statusText: "Server not found" });

  if (!hasAccess(server?.permissions))
    return new Response(null, {
      status: 403,
      statusText: "No access to this server",
    });

  const cursor = url.searchParams.get("cursor") ?? undefined;
  const take = 2;

  return await db
    .getLogs(params.server, take, cursor)
    .then((logs) => {
      return json(logs, { status: 200 });
    })
    .catch((e) => {
      return new Response(null, {
        status: 400,
        statusText: "Bad request",
      });
    });
};
