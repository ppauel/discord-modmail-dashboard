<script lang="ts">
  import { avatarUrl, roleColor } from "$lib/client/discordHelpers";
  import { Prisma } from "@prisma/client";
  import type { APIUser } from "discord-api-types/v10";

  export let user: APIUser | null = null;
  export let username: string = user?.username ?? "User";
  export let message: Prisma.MessageGetPayload<{
    include: { reactions: true; member: true };
  }>;
</script>

{#if user}
  <discord-message
    author={user.username}
    avatar={avatarUrl(user.id, user.avatar, true)}
    roleColor={roleColor(null, message.member.role)}
  >
    {message.content}
  </discord-message>
{:else}
  <discord-message
    author={username}
    roleColor={roleColor(null, message.member.role)}
  >
    {message.reactions}
    {message.content}
  </discord-message>
{/if}
