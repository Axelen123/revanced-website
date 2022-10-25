<script lang="ts">
  import type { PageData } from './$types';

  // Data here comes from a trusted source.
  // CSS comes from the layout.
  export let data: PageData;
  console.log(data);
</script>

{@html data.content}
