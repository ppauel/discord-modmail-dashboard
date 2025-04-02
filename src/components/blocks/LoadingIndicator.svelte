<script lang="ts">
  import { onDestroy } from "svelte";
  import { isLoading } from "$lib/client/loadingStore";

  let loading = false;

  const unsubscribe = isLoading.subscribe((value) => {
    loading = value;
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="loading-wrapper {loading ? 'loading' : ''}"></div>

<style lang="scss">
  .loading-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10px;
    overflow: hidden;
    background-color: blueviolet;
    z-index: 10;
    pointer-events: none;
    opacity: 0;
    transition: all 0.2s ease;

    &.loading {
      opacity: 1;
      height: 10px;
    }
  }
</style>
