<script lang="ts">
  import LogList from "$components/blocks/LogList.svelte";
</script>

<h1>Chat Logs</h1>

<LogList />

<style lang="scss">
  .list-logs {
    display: flex;
    flex-direction: column;
  }

  .log-wrapper {
    display: block;
    color: inherit;
    text-decoration: none;
    border-radius: 8px;
    padding: 5px 10px;
    background-color: #0005;

    &:hover {
      background-color: #001;
    }
  }
</style>
