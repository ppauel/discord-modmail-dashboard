import type { HexColor } from "$types";

export function avatarUrl(
  user: string,
  avatar: string | null,
  animated = false,
) {
  if (!avatar) return "https://cdn.discordapp.com/embed/avatars/0.png";
  return `https://cdn.discordapp.com/avatars/${user}/${avatar}.${animated && avatar.startsWith("a_") ? "gif" : "webp"}`;
}

export function roleColor(
  guild: string | null,
  roleType: number,
): HexColor | null {
  if (roleType == 1) {
    return "#ed4040";
  } else {
    return null;
  }
}
