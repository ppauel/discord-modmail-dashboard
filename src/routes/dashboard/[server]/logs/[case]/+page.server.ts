import db from "$lib/server/database";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const log = await db.getLog(params.case, params.server).catch((_) => {
    error(404, "Log not found");
  });

  return {
    log: log,
  };
};
