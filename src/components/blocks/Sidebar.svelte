<script lang="ts">
  import { page } from "$app/stores";

  const menu: { name: string; href: string }[] = [
    {
      name: "Settings",
      href: "settings",
    },
    {
      name: "Logs",
      href: "logs",
    },
  ];

  const activeTab = $page.url.pathname.split("/")[3];
  export let server: string;
</script>

<ul class="sidebar-menu" role="menu">
  {#each menu as menuItem}
    <li>
      <a
        data-sveltekit-preload-data="hover"
        class={menuItem.href === $page.url.pathname.split("/")[3]
          ? "active"
          : undefined}
        href="/dashboard/{server}/{menuItem.href}">{menuItem.name}</a
      >
    </li>
  {/each}
</ul>

<style lang="scss">
  .sidebar-menu {
    list-style: none;
    padding: 8px;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;

    li {
      a {
        display: block;
        color: inherit;
        text-decoration: none;
        border-radius: 8px;
        padding: 5px 10px;

        &.active {
          background-color: #0005;
        }

        &:hover {
          background-color: #001;
        }
      }
    }
  }
</style>
