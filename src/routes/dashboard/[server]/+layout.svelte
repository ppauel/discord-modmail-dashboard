<script lang="ts">
  import { page } from "$app/stores";
  import Sidebar from "$components/blocks/Sidebar.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<svelte:head>
  <title>{data.server.name} | Dashboard</title>
  <meta name="robots" content="noindex nofollow" />
</svelte:head>

<div class="layout">
  <div class="sidebar-area">
    <div class="sidebar">
      <a class="server-name" href="/dashboard/{data.server.id}">
        <h3>{data.server.name}</h3>
      </a>
      <Sidebar server={$page.params.server} />
    </div>
  </div>
  <div class="content-area">
    <slot />
  </div>
</div>

<style lang="scss">
  .server-name {
    color: inherit;
    text-decoration: none;
    text-align: center;
  }

  .layout {
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  .sidebar-area {
    height: 100%;
    width: 200px;

    .sidebar {
      border-right: 1px solid white;
      position: fixed;
      width: inherit;
      height: inherit;
    }
  }
  .content-area {
    flex: 1;
    padding: 20px;
  }
</style>
