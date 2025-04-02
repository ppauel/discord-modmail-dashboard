<script lang="ts">
  import type { PageData } from "./$types";
  import Message from "$components/blocks/Message.svelte";
  import { getUser } from "$lib/client/api";
  import { onMount } from "svelte";
  export let data: PageData;

  let mounted = false;

  onMount(() => {
    mounted = true;
  });
</script>

{#if mounted}
  <h1>Chat Log {data.log.id}</h1>
  {#await getUser(data.log.creatorId)}
    <p>Loading ...</p>
  {:then user}
    <p>{user.username}</p>
  {:catch}
    <p>Unknown User ({data.log.creatorId})</p>
  {/await}
  <p>{data.log.createdAt}</p>
  <discord-messages no-background>
    {#each { length: 10 } as _, i}
      {#each data.log.messages as message}
        {#await getUser(message.memberId)}
          <Message {message} />
        {:then user}
          <Message {message} {user} />
        {:catch error}
          <Message {message} username={`Unknown User (${message.memberId})`} />
        {/await}
      {/each}
    {/each}
  </discord-messages>
{/if}
