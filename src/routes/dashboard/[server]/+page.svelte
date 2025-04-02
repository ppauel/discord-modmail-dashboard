<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<h1>{data.server.name}</h1>
<p>Some basic info here</p>
