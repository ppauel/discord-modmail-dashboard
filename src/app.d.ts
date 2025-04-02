import type { OAuthCurrentUserGuild } from "$types";
import type { RESTAPIPartialCurrentUserGuild } from "discord-api-types/v10";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user?: {
        id: string;
        username: string;
      };
      servers?: OAuthCurrentUserGuild[];
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
