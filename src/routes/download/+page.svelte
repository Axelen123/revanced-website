<script lang="ts">
// import Button from "$lib/components/atoms/Button.svelte";
  import Tool from "$lib/components/atoms/Tool.svelte";
  import ToolsStore from "$lib/stores/ToolsStore";
  import type { Tool as ITool } from "$lib/stores/ToolsStore";
  import { onMount } from "svelte";

  let data: Map<string, Tool> = new Map();

onMount(() => {
	ToolsStore.subscribe(async (e) => {
		data = await e;
    console.log(data.values());
	});
});
</script>

<div class="wrapper">
		{#each [...data.values()] as tool}
			<!-- <div in:fly={{ y: 10, easing: quintOut, duration: 750 }}> -->
			<!-- <ContributorHost contribs={contributors} repo={name} /> -->
      <div class="tools-container">
        <Tool {...tool} />
      </div>
		<!-- </div> -->
		{/each}
    <!-- <Button icon="download" kind="primary">Download Manager v0.0.32</Button>
    <Button>Are you a nerd?</Button> -->
</div>

<style>
.tools-container {
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
}
</style>
