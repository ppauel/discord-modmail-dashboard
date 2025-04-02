import { authenticate } from "$lib/server/auth";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, url }) => {
  const code = url.searchParams.get("code");
  if (!code) error(400, `No code provided`);

  // State CSRF protection
  const callbackState = url.searchParams.get("state");
  const oauthState = cookies.get("oauth_state");
  if (!callbackState) error(400, "No state provided");
  if (callbackState !== oauthState) error(409, "State missmatch");

  cookies.delete("oauth_state", {
    path: "/",
  });

  const now = Date.now();

  const auth = await authenticate(code).catch(console.error);
  if (!auth) error(500, `Could not authenticate user`);

  cookies.set("discord_access_token", auth.access_token, {
    path: "/",
    expires: new Date(now + auth.expires_in),
    httpOnly: true,
    sameSite: "lax",
  });

  cookies.set("discord_refresh_token", auth.refresh_token, {
    path: "/",
    expires: new Date(now + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "lax",
  });

  redirect(307, "/dashboard");
};
