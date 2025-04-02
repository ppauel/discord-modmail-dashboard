<script lang="ts">
  import Header from "$components/regions/Header.svelte";
  import { onDestroy, onMount } from "svelte";
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import { isLoading } from "$lib/client/loadingStore";
  import LoadingIndicator from "$components/blocks/LoadingIndicator.svelte";

  beforeNavigate(() => {
    isLoading.set(true);
  });

  afterNavigate(() => {
    isLoading.set(false);
  });

  onMount(() => {
    isLoading.set(false);
  });
</script>

<svelte:head>
  <title>ModMail</title>
</svelte:head>

<header>
  <Header />
</header>

<main>
  <slot></slot>
</main>

<footer></footer>

<LoadingIndicator />

<style lang="scss">
  header {
    border-bottom: 1px solid white;
  }

  main {
    flex: 1;
  }
</style>
