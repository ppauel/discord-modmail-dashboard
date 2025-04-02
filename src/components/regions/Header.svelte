<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { login, logout } from "$lib/client/api";

  const menu: { name: string; href: string }[] = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Servers",
      href: "/dashboard",
    },
  ];

  function performLogin() {
    login()
      .then((url) => {
        window.location.href = url.toString();
      })
      .catch((e: Error) => {
        console.error("Login failed:", e.message);
      });
  }

  function performLogout() {
    logout()
      .then(() => {
        goto("/", {
          invalidateAll: true,
        });
      })
      .catch((e: Error) => {
        console.error("Logout failed:", e.message);
      });
  }
</script>

<div class="menu-bar">
  <nav>
    <ul id="menu" role="menu">
      {#each menu as menuItem}
        <li><a href={menuItem.href}>{menuItem.name}</a></li>
      {/each}
    </ul>
  </nav>
  <div>
    {#if $page.data.user}
      {$page.data.user?.username}
      <button on:click={performLogout}>Logout</button>
    {:else}
      <button on:click={performLogin}>Login</button>
    {/if}
  </div>
</div>

<style lang="scss">
  .menu-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 700px;
    margin: 0 auto;
  }

  #menu {
    list-style: none;
    padding: 0;
    li {
      display: inline-block;
      margin: 0 10px;
      a {
        color: white;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
