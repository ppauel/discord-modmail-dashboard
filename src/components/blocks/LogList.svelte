<script lang="ts">
  import { getLogs } from "$lib/client/api";
  import { page } from "$app/stores";
  import type { Prisma } from "@prisma/client";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import { emptyPromiseArray } from "$lib/client/helpers";

  const serverId = $page.params.server;

  const cache = writable<Prisma.LogGetPayload<{}>[]>([]);
  const cursor = writable<string | null>(null);
  const end = writable<boolean>(false);

  let latest: Prisma.LogGetPayload<{}>[];
  let promise: Promise<Prisma.LogGetPayload<{}>[]>;
  let nextCursor: string | null = null;

  async function loadMore() {
    return getLogs(serverId, $cursor || undefined).then((res) => {
      // Set cursor to last element id of result or null
      nextCursor = res.at(-1)?.id ?? null;
      if (nextCursor === null) {
        // End of list
        cursor.set(null);
        end.set(true);
      }
      latest = res;
      return res;
    });
  }

  promise = emptyPromiseArray<Prisma.LogGetPayload<{}>>();

  onMount(() => {
    promise = loadMore();
  });

  cursor.subscribe((v) => {
    if (v !== null) promise = loadMore();
  });

  function updateCurrentCursor() {
    cache.update((cached) => cached.concat(latest));
    cursor.set(nextCursor);
  }
</script>

<div class="list list-logs">
  {#each $cache as log}
    <a
      data-sveltekit-preload-data="tap"
      class="log-wrapper"
      href={"logs/" + log.id}
    >
      <div>
        <code>#{log.id}</code>
        <p>{new Date(log.createdAt)}</p>
      </div>
    </a>
  {/each}

  {#await promise}
    <div class="log-wrapper loading">Loading ...</div>
  {:then logs}
    {#each logs as log}
      <a
        data-sveltekit-preload-data="tap"
        class="log-wrapper"
        href={"logs/" + log.id}
      >
        <div>
          <code>#{log.id}</code>
          <p>{new Date(log.createdAt)}</p>
        </div>
      </a>
    {/each}

    {#if !$end}
      <button on:click={updateCurrentCursor}>Load more</button>
    {/if}
  {:catch error}
    <p>Could not fetch logs</p>
  {/await}
</div>

<style lang="scss">
  .loading {
    animation: loading 1s ease infinite;
    color: transparent !important;
    opacity: 10%;

    &:hover {
      cursor: default;
    }
  }

  @keyframes loading {
    0% {
      opacity: 50%;
    }

    50% {
      opacity: 100%;
    }

    100% {
      opacity: 50%;
    }
  }

  .log-wrapper {
    display: block;
    color: inherit;
    text-decoration: none;
    border-radius: 8px;
    padding: 5px 10px;
    background-color: #0005;
    margin: 10px 0;

    &:hover {
      background-color: #001;
    }
  }
</style>
