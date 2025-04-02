import type { RequestHandler } from "./$types";

export const POST: RequestHandler = ({ locals, cookies }) => {
  if (!locals.user)
    return new Response(null, { status: 401, statusText: "Not logged in" });

  cookies.delete("discord_access_token", {
    path: "/",
  });

  cookies.delete("discord_refresh_token", {
    path: "/",
  });

  return new Response(null, { status: 200 });
};
