import type { RESTAPIPartialCurrentUserGuild } from "discord-api-types/v10";

export type HexColor = `#${string}`;

export type AccessTokenExchange = {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

interface OAuthCurrentUserGuild
  extends Omit<RESTAPIPartialCurrentUserGuild, "permissions"> {
  permissions: number;
  permissions_new: string;
}
