import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  // Pass user object to client
  if (locals.user) {
    return {
      user: locals.user,
    };
  }
};
