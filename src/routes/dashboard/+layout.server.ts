import { hasAccess } from "$lib/client/permissions";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    servers: locals.servers?.filter((s) => hasAccess(s.permissions)),
  };
};
