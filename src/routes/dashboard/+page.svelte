<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<main>
  <div>
    <h1>Servers</h1>
    <div class="servers-container">
      {#if data.servers}
        {#each data.servers as guild}
          <div>
            <a
              data-sveltekit-preload-data="tap"
              class="server-link"
              href="/dashboard/{guild.id}"
            >
              <div class="server-container">
                <h3>
                  {guild.name}
                </h3>
              </div>
            </a>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</main>

<style lang="scss">
  .servers-container {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(min(200px, 500px), 1fr));
  }

  .server-link {
    color: inherit;
    text-decoration: none;
  }

  .server-container {
    background-color: #001;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90px;

    h3 {
      margin: 0;
      color: inherit;
      text-align: center;
    }
  }
</style>
