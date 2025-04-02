import { hasAccess } from "$lib/client/permissions";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, params }) => {
  const server = locals.servers?.find((g: any) => g.id === params.server);

  if (!server) error(404, "Server not found");
  if (!hasAccess(server.permissions)) error(403, "No access to this server");

  return {
    server: server,
  };
};
