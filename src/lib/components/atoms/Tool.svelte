<script lang="ts">
  import Button from "$lib/components/atoms/Button.svelte";

  import type { Asset } from '$lib/stores/ToolsStore';
  export let repository: string;
  export let version: string;
  export let timestamp: string;
  export let assets: Asset[];
// TODO: generate name from repo.
</script>

<div class="tool-container">
    <div class="title">
      <h1>{repository}</h1>
      <h3>{version}</h3>
    </div>
    <div class="assets">
      {#each assets as asset}
        <span>
          <Button icon="download" kind="primary" href={asset.url}>Download {asset.name}</Button>
        </span>
      {/each}
    </div>
</div>
<!-- <Button icon="download" kind="primary">Download Manager v0.0.32</Button>
     <Button>Are you a nerd?</Button> -->


<style>
.tool-container {
	background-color: var(--grey-six);
	padding: 1.5rem;
	border-radius: 8px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
	/* justify-content: space-between; */
  flex-wrap: wrap;
}

.title {
	display: flex;
	align-items: center;
  width: 100%;
}

.assets {
  display: flex;
}

.assets > * {
  padding-right: 1rem;
}

.things {
	display: flex;
	justify-content: space-between;
}
</style>
