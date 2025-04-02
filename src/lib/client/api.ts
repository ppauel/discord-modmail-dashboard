import type { Prisma } from "@prisma/client";
import type { APIUser } from "discord-api-types/v10";
import { CachePromiser } from "./helpers";

export async function login() {
  const response = await fetch("/api/login", {
    method: "POST",
  });

  if (response.ok) {
    const responseData = await response.json();
    const authUrl = new URL(responseData.authUrl);
    return authUrl;
  } else {
    throw new Error(response.statusText);
  }
}

export async function logout() {
  const response = await fetch("/api/logout", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

async function getUserLoad(userId: string): Promise<APIUser> {
  const response = await fetch(`/api/discord/users/${userId}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}
const getUserPromiser = new CachePromiser<string, APIUser>(getUserLoad);
export async function getUser(userId: string): Promise<APIUser> {
  return getUserPromiser.get(userId).catch((_) => {
    throw new Error("Invalid User");
  });
}

export async function getLogs(
  server: string,
  cursor?: string,
): Promise<Prisma.LogGetPayload<{}>[]> {
  const response = await fetch(
    `/api/servers/${server}/logs${cursor ? `?cursor=${cursor}` : ""}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}
