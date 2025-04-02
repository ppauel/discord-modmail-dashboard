import { authorize, generateState } from "$lib/server/auth";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = ({ locals, cookies }) => {
  if (locals.user)
    return new Response(null, { status: 409, statusText: "Already logged in" });

  const state: string = generateState();
  const authUrl: URL = authorize(state);

  cookies.set("oauth_state", state, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });

  return json({ authUrl: authUrl }, { status: 200 });
};
