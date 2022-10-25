<script lang="ts">
  // TODO: move everything except content highlighting here...
  import '$lib/documentation.scss';

  import type { PageData } from './$types';

  import DocsNavTree from '$lib/components/molecules/DocsNavTree.svelte';

  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  export let data: PageData;
</script>

<section id="doc-section-main" in:fly={{ y: 10, easing: quintOut, duration: 700 }}>
	<div class="menu">
    <DocsNavTree tree={data.tree} />
	</div>
  <div class="content">
    <slot></slot>
  </div>
</section>
