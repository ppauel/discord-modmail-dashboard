<script lang="ts">
  import { page } from "$app/stores";
  import "@skyra/discord-components-core";
</script>

<svelte:head>
  <title>Chat Log {$page.data.creatorId}</title>
</svelte:head>

<slot />
